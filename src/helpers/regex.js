const EMAIL = /^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
const PWD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*/._-])(?=.{10,})/;

const ONLY_NUMBERS = /^[0-9]$/;

const LOWERCASE = /^(?=.*[a-z])/;
const UPPERCASE = /^(?=.*[A-Z])/;
const NUMBERS = /^(?=.*[0-9])/;
const LENGTH_10 = /^(?=.{10,})/;
const SPECIAL_CHARS = /^(?=.*[!@#$%^&*/._-])/;

export {
  EMAIL,
  PWD,
  ONLY_NUMBERS,
  LOWERCASE,
  UPPERCASE,
  NUMBERS,
  LENGTH_10,
  SPECIAL_CHARS
};
