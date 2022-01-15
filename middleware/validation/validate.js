const { validationResult } = require('express-validator');
const { invalid_data } = require('../../util/errorTypes');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ error: invalid_data, errors: errors.array() });
  }
  next();
};

module.exports = validate;
