// checks string strength upon sign up

export const checkPasswordLength = (string, cb) => {
  if (string.length >= 8) return cb(true);

  return cb(false);
};

// check string has one number
export const checkPasswordNum = (string, cb) => {
  if (string.match('.*[0-9].*')) return cb(true);

  return cb(false);
};
// check string has one special character
export const checkPasswordSym = (string, cb) => {
  if (string.match('(?=.*?[#?!@$%^&*-])')) return cb(true);

  return cb(false);
};

// check string has one uppercases character
export const checkPasswordUpper = (string, cb) => {
  if (string.match('(?=.*?[A-Z])')) return cb(true);

  return cb(false);
};
