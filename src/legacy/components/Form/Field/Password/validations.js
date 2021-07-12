//regex
import * as regex from '../../../../helpers/regex';

export const validations = [
  {
    name: 'minLength',
    text: 'At least 10 characters',
    isValid: (name, watch) => {
      let value = watch(name);
      return regex.LENGTH_10.test(value);
    }
  },
  {
    name: 'upperLower',
    text: 'Upper and lowercase letters (a-z)',
    isValid: (name, watch) => {
      let value = watch(name);
      return regex.UPPERCASE.test(watch(name)) && regex.LOWERCASE.test(value);
    }
  },
  {
    name: 'oneSymbol',
    text: 'At least 1 non-alphanumeric symbol (e.g. @-#/!_*)',
    isValid: (name, watch) => {
      return regex.SPECIAL_CHARS.test(watch(name));
    }
  },
  {
    name: 'oneNumber',
    text: 'At least 1 number (0-9)',
    isValid: (name, watch) => {
      return regex.NUMBERS.test(watch(name));
    }
  }
];
