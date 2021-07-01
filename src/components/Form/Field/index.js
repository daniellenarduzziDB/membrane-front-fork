import { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

//styles
import * as styles from './styles.module.scss';

//components
import MobileNumber from './MobileNumber';
import Password from './Password';
import DropDown from './DropDown';
import FontAwesomeIcon, { faEye, faEyeSlash } from '../../FontAwesomeIcon';

function Field({
  label,
  name,
  type,
  placeholder,
  size,
  customComponent,
  validation,
  formState
}) {
  //bind styles
  classnames.bind(styles);

  //states
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const { register, errors } = formState;

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const renderDefaultComponent = () => {
    // if (classes) classnames.bind(classes);
    // fill background on error: {'input-field--error': !!errors[name]}

    return (
      <div className={classnames(styles.fieldInput)}>
        <input
          name={name}
          type={
            type !== 'password'
              ? type
              : passwordVisibility
              ? 'password'
              : 'text'
          }
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {type === 'password' && (
          <FontAwesomeIcon
            icon={passwordVisibility ? faEye : faEyeSlash}
            onClick={handlePasswordVisibility}
          />
        )}
      </div>
    );
  };

  const renderMobileNumber = () => {
    return <MobileNumber name={name} {...formState} />;
  };

  const renderDropdown = () => {
    return <DropDown name={name} {...formState} />;
  };

  const renderPasswordSecure = () => {
    return <Password name={name} placeholder={placeholder} {...formState} />;
  };

  const renderCustomComponent = () => {
    return <div>{customComponent()}</div>;
  };

  return (
    <div className={classnames(styles.field, styles[size])}>
      <label>
        {label}
        {type === 'tel'
          ? renderMobileNumber()
          : type === 'dropdown'
          ? renderDropdown()
          : type === 'password-secure'
          ? renderPasswordSecure()
          : type === 'custom'
          ? renderCustomComponent()
          : renderDefaultComponent()}

        <div className={styles.fieldValidation}>
          {errors[name] && <p>{errors[name]?.message}</p>}
        </div>
      </label>
    </div>
  );
}

//#region props definitions
// default values and types
Field.defaultProps = {
  label: undefined,
  name: '',
  type: 'text',
  placeholder: '',
  size: 'col-12',
  customComponent: undefined,
  validation: {},
  errors: {}
};

Field.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'password',
    'password-secure',
    'dropdown',
    'color',
    'date',
    'email',
    'radio',
    'range',
    'submit',
    'tel',
    'url',
    'custom'
  ]),
  placeholder: PropTypes.string,
  size: PropTypes.string,
  customComponent: PropTypes.func,
  validation: PropTypes.object,
  errors: PropTypes.object
};
//#endregion

export default Field;
