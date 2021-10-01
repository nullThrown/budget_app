const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const auth = require('../../middleware/auth');
// ROUTE    GET api/auth/register
// DESC     Register a new user
// ACCESS   Public
router.post(
  '/register',

  // validation / sanitation
  body('name', ' Name is required').trim().isLength({ min: 3 }).escape(),
  body('email', 'Not a valid email ').trim().isEmail().escape(),
  body('password', 'Password must be 8 characters')
    .trim()
    .isLength({ min: 8 })
    .escape(),

  async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, password } = req.body;
      //check if email already exists
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({ error: ['email already exists'] });
      }
      // handle validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // password hash
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user = new User({
        name,
        email,
        password: hashedPassword,
      });

      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('server error');
    }
  }
);

// ROUTE    POST api/auth/login
// DESC     login a user
// ACCESS   Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if {email will work}
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ err: 'invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ err: 'invalid credentials' });
    }
    // authsecret
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) {
          return res.status(400).json(err);
        }
        res.json({ token: token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
});

// place in separate route folder
// ROUTE    GET api/auth/me
// DESC     Get a user
// ACCESS   Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
});

module.exports = router;
