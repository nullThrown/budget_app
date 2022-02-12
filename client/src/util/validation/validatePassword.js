//string is 8 chars long
export const checkStrLength = (string) => string.length >= 8;

// string contains num char
export const checkStrNum = (string) => string.match('.*[0-9].*');

// string contains special char
export const checkStrSym = (string) => string.match('(?=.*?[#?!@$%^&*-])');

// str contains uppercase char
export const checkStrUpper = (string) => string.match('(?=.*?[A-Z])');
