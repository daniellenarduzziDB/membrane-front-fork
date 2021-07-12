import classnames from 'classnames';
import { memo } from 'react';
import { useState } from 'react';

//styles
import * as styles from './styles.module.scss';

function Checkbox({ onChangeChecked }) {
  //bind styles
  classnames.bind(styles);

  const [checked, setChecked] = useState(false)

  const handleChecked  = () =>{
    setChecked(!checked)
    if (onChangeChecked) onChangeChecked();
  };

  return (
    <div className={styles.checkBoxContainer}>
      <input type='checkbox' checked={checked} onClick={handleChecked}/>
    </div>
  );
}

export default memo(Checkbox);
