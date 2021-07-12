import React from 'react';
import classnames from 'classnames';

import * as styles from './styles.module.scss';

const Switch = (props) => {
  classnames.bind(styles);

  function handleOnChange(event) {
    props.onChange(event.target.checked);
  }

  return (
    <label className={styles.switchLabel} >
      <input 
        type="checkbox" 
        defaultChecked={props.isChecked} 
        onChange={handleOnChange}
        checked={props.isChecked}
      />
      <span className={styles.switchSpan} />
    </label>
  );
};

export default Switch;