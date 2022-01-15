const { body } = require('express-validator');

const validateRegistration = () => {
  return [
    body('firstName', ' Name is required').trim().isLength({ min: 2 }).escape(),
    body('lastName', ' Name is required').trim().isLength({ min: 2 }).escape(),
    body('email', 'Not a valid email ').trim().isEmail().escape(),
    body('password', 'Password must be 8 characters')
      .trim()
      .isLength({ min: 8 })
      .escape(),
  ];
};

const validateLogin = () => {
  return [body('email').trim().escape(), body('password').trim().escape()];
};

module.exports = {
  validateRegistration,
  validateLogin,
};
