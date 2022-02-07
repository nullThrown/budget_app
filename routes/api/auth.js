const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Expense = require('../../models/Expense');
const { verifyToken } = require('../../middleware/auth');
const {
  validateRegistration,
  validateLogin,
} = require('../../middleware/validation/validateAuth');
const validate = require('../../middleware/validation/validate');
const {
  unauthenticated,
  invalid_data,
  invalid_credentials,
  server_error,
  email_already_exists,
} = require('../../util/responseTypes');

// ROUTE    GET api/auth/register
// DESC     Register a new user
// ACCESS   Public
router.post('/register', validateRegistration(), validate, async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //check if email already exists
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({ error: email_already_exists });
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
    const profile = new Profile({
      user: user.id,
    });
    const expense = new Expense({
      user: user.id,
    });

    await profile.save();
    await expense.save();
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: server_error });
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
      return res.status(400).json({ error: invalid_credentials });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: invalid_credentials });
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
      { expiresIn: '20d' },
      (err, token) => {
        if (err) {
          return res.status(400).json({ error: err });
        }
        // set max age & secure: true for cookie
        res.cookie('x_auth_token', token, {
          sameSite: true,
          httpOnly: true,
          maxAge: 40000000,
        });
        res.json({ user, token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: server_error });
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
    res.status(500).json({ error: server_error });
  }
});

module.exports = router;
