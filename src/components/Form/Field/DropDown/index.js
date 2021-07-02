import { memo, useState, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import shortid from 'shortid';

//styles
import * as styles from './styles.module.scss';
import * as fieldStyles from '../styles.module.scss';

//components
import FontAwesomeIcon, { faChevronDown } from '../../../FontAwesomeIcon';

//hook
import useOutsideClick from '../../../../hooks/useOutsideClick';

function DropDown({
  classes,
  name,
  placeholder,
  items,
  labelKey,
  valueKey,
  displayKey,
  validation,
  register,
  setValue,
  onOptionChanged
}) {
  //bind styles
  classnames.bind(styles);
  classnames.bind(fieldStyles);

  //reference
  const refDropDown = useRef();

  //states
  const [displayList, setDisplayList] = useState(false);
  const [valueSelected, setValueSelected] = useState('');

  //outside click hook
  useOutsideClick(refDropDown, () => setDisplayList(false));

  const handleDropdown = () => {
    setDisplayList(!displayList);
  };

  const handleItemClick = item => {
    let value = displayKey ? item[displayKey] : item[labelKey];

    setValue(name, value, { shouldValidate: true });
    setValueSelected(value);
    if (onOptionChanged) onOptionChanged(item[valueKey]);
  };

  return (
    <div ref={refDropDown} className={classnames(styles.dropDown, classes)}>
      <div
        className={classnames(fieldStyles.fieldInput)}
        {...register(name, validation)}
        onClick={handleDropdown}>
        <input
          name={name}
          type="text"
          placeholder={placeholder}
          disabled={true}
          value={valueSelected}
        />
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      <ul
        className={classnames(
          styles.dropDownList,
          displayList ? styles['dropDownList--displayed'] : ''
        )}>
        {items.map(item => (
          <li key={shortid.generate()} onClick={() => handleItemClick(item)}>
            {item[labelKey]}
          </li>
        ))}
      </ul>
    </div>
  );
}

//#region props definitions
// default values and types
DropDown.defaultProps = {
  items: [],
  classes: '',
  placeholder: '',
  labelKey: '',
  valueKey: '',
  displayKey: '',
  onOptionChanged: undefined
};

DropDown.propTypes = {
  items: PropTypes.array,
  classes: PropTypes.any,
  placeholder: PropTypes.string,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  displayKey: PropTypes.string,
  onOptionChanged: PropTypes.func
};
//#endregion

export default memo(DropDown);
