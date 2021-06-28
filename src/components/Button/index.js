import { memo } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

//styles
import * as styles from './styles.module.scss';

//components

function Button({
  classes,
  disabled,
  linkTo,
  text,
  type,
  useSubmitBehavior,
  onClick
}) {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={classnames(styles.button, styles['btn-' + type], classes)}>
      {!useSubmitBehavior ? (
        type === 'tertiary' ? (
          <a href={linkTo}>{text}</a>
        ) : (
          <button
            className={classnames({ disabled: disabled })}
            onClick={onClick}>
            {text}
          </button>
        )
      ) : (
        <input type="submit" value={text} onClick={onClick} />
      )}
    </div>
  );
}

//#region props definitions
// default values and types
Button.defaultProps = {
  classes: {},
  disabled: false,
  linkTo: '',
  text: undefined,
  type: 'primary',
  useSubmitBehavior: false
};

Button.propTypes = {
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  linkTo: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  useSubmitBehavior: PropTypes.bool,
  onClick: PropTypes.func
};
//#endregion

export default memo(Button);
