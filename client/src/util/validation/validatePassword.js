// callback parameter is to be argued with React setState fn

//string is 8 chars long
export const checkStrLength = (string, cb) =>
  string.length >= 8 ? cb(true) : cb(false);

// string contains number char
export const checkStrNum = (string, cb) =>
  string.match('.*[0-9].*') ? cb(true) : cb(false);

// string contains special char
export const checkStrSym = (string, cb) =>
  string.match('(?=.*?[#?!@$%^&*-])') ? cb(true) : cb(false);

// str contains uppercase char
export const checkStrUpper = (string, cb) =>
  string.match('(?=.*?[A-Z])') ? cb(true) : cb(false);
