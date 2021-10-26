// checks password strength upon sign up

export const checkPasswordLength = (password, cb) => {
  if (password.length >= 8) return cb(true);

  return cb(false);
};

// check password has one number
export const checkPasswordNum = (password, cb) => {
  if (password.match('.*[0-9].*')) return cb(true);

  return cb(false);
};
// check password has one special character
export const checkPasswordSym = (password, cb) => {
  if (password.match('(?=.*?[#?!@$%^&*-])')) return cb(true);

  return cb(false);
};

// check password has one uppercases character
export const checkPasswordUpper = (password, cb) => {
  if (password.match('(?=.*?[A-Z])')) return cb(true);

  return cb(false);
};
