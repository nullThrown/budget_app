const { body } = require('express-validator');
const validateProfile = require('./validateProfile');
const validateExpense = () => {
  return [
    body('title', ' must be a title').trim().not().isEmpty().escape(),
    body('amount', ' must be a number')
      .trim()
      .isNumeric()
      .not()
      .isEmpty()
      .escape(),
    body('necessity', 'must have necessity')
      .trim()
      .isBoolean()
      .not()
      .isEmpty()
      .escape(),
    body('category', 'must have a category').trim().not().isEmpty().escape(),
  ];
};

module.exports = validateExpense;
