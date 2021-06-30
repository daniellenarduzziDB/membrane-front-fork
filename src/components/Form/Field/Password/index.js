import { useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';
import * as fieldStyles from '../styles.module.scss';

//regex
import * as regex from '../../../../helpers/regex';

//components
import FontAwesomeIcon, {
  faEye,
  faEyeSlash,
  faCheckCircle
} from '../../../FontAwesomeIcon';

const validations = [
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

export default function Password({ name, placeholder, watch, register }) {
  //bind styles
  classnames.bind(styles);
  classnames.bind(fieldStyles);

  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <>
      <div className={fieldStyles.fieldInput}>
        <input
          name={name}
          type={!passwordVisibility ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(name, {
            required: 'This field is required',
            pattern: regex.PWD
          })}
        />

        <FontAwesomeIcon
          icon={passwordVisibility ? faEye : faEyeSlash}
          onClick={handlePasswordVisibility}
        />
      </div>

      <span className={styles.verifyItems}>
        <label>Your password must contain</label>
        {validations.map(item => (
          <div key={item.name}>
            <FontAwesomeIcon
              icon={faCheckCircle}
              color={item.isValid(name, watch) ? '#6fcf97' : '#777777'}
            />
            <label>{item.text}</label>
          </div>
        ))}
      </span>
    </>
  );
}
