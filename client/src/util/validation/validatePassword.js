// checks password strength upon sign up

export const checkPasswordLength = (elName, elValue, cb) => {
  if (elName === 'password') {
    if (elValue.length >= 8) return cb(true);

    return cb(false);
  }
};

// check password has one number
export const checkPasswordNum = (elName, elValue, cb) => {
  if (elName === 'password') {
    if (elValue.match('.*[0-9].*')) return cb(true);

    return cb(false);
  }
};
// check password has one special character
export const checkPasswordSym = (elName, elValue, cb) => {
  if (elName === 'password') {
    if (elValue.match('(?=.*?[#?!@$%^&*-])')) return cb(true);

    return cb(false);
  }
};

// check password has one uppercases character
export const checkPasswordUpper = (elName, elValue, cb) => {
  if (elName === 'password') {
    if (elValue.match('(?=.*?[A-Z])')) return cb(true);

    return cb(false);
  }
};
