import { memo, useEffect, useState } from 'react';
import classnames from 'classnames';
import useDigitInput from 'react-digit-input';

//styles
import * as styles from './styles.module.scss';

import * as regex from '../../helpers/regex';

export default memo(function DigitCode({ digits = 0, onDigitCodeChange }) {
  //bind styles
  classnames.bind(styles);

  const [value, onChange] = useState('');

  const digitInput = useDigitInput({
    acceptedCharacters: regex.ONLY_NUMBERS,
    length: digits,
    value,
    onChange
  });

  useEffect(() => {
    onDigitCodeChange(digitInput, value);
    // eslint-disable-next-line
  }, [value]);

  return (
    <div className={styles.digitCode}>
      <div className={styles.inputGroup}>
        <input inputMode="decimal" autoFocus {...digitInput[0]} />
        <input inputMode="decimal" {...digitInput[1]} />
        <input inputMode="decimal" {...digitInput[2]} />
        <input inputMode="decimal" {...digitInput[3]} />
        <input inputMode="decimal" {...digitInput[4]} />
        <input inputMode="decimal" {...digitInput[5]} />
      </div>
    </div>
  );
});
