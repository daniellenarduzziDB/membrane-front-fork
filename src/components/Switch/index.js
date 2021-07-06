import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';

import * as styles from './styles.module.scss';

const Switch = (props) => {
  const inputRef = useRef(null);

  classnames.bind(styles);
  
  useEffect(() => {
    if (props.isChecked) {
      if (!inputRef.current.checked) {
        inputRef.current.checked = true;
      }
    } else {
      if (inputRef.current.checked) {
        inputRef.current.checked = false;
      }
    }
  }, [props.isChecked]);

  function handleOnChange(event) {
    props.onChange(event.target.checked);
  }

  return (
    <label className={styles.switchLabel} >
      <input 
        type="checkbox" 
        defaultChecked={props.isChecked} 
        onChange={handleOnChange}
        ref={inputRef}
      />
      <span className={styles.switchSpan} />
    </label>
  );
};

export default Switch;