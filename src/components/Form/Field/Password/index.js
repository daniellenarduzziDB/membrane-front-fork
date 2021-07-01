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

import { validations } from './validations';

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
