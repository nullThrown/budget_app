const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { verifyToken } = require('../../middleware/auth');
const {
  validateRegistration,
  validateLogin,
} = require('../../middleware/validation/validateAuth');
const validate = require('../../middleware/validation/validate');
const { nextTick } = require('async');
// ROUTE    GET api/auth/register
// DESC     Register a new user
// ACCESS   Public
router.post('/register', validateRegistration(), validate, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //check if email already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: ['email already exists'] });
    }

    // password hash
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

// ROUTE    POST api/auth/login
// DESC     login a user
// ACCESS   Public
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // check if {email will work}
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ err: 'invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
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
      //temporary
      process.env.JWTSECRET,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) {
          return res.status(400).json(err);
        }
        // set max age & secure: true for cookie
        res.cookie('x-auth-token', token, {
          sameSite: true,
          httpOnly: true,
          maxAge: 40000000,
        });
        res.json(user);
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
});

// ROUTE    POST api/auth/login
// DESC     logout a user
// ACCESS   Private

// may need refactoring -- watch for on traversy video
// remove req.header('x-auth-token')
// delete req.user()
// blacklist or backdate token
router.post('/signout', verifyToken, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
});

module.exports = router;
