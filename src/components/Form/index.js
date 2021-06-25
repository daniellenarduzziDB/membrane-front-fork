import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import shortid from 'shortid';

import _ from 'lodash';

//styles
import * as styles from './styles.module.scss';

//components
import FontAwesomeIcon, {
  faEye,
  faEyeSlash
} from '../../components/FontAwesomeIcon';

export default memo(function Form(props) {
  //bind styles
  classnames.bind(styles);

  const [customError, setCustomError] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  //hook form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (props.customError && props.customError !== customError) {
      const { field, type, message } = props.customError;
      errors[field] = { type, message };
      setCustomError(!customError);
    }
    // eslint-disable-next-line
  }, [errors, props.customError]);

  const onSubmit = (data, e) => {
    let submitAction = _.find(props.actions, { actionType: 'submit' });
    if (submitAction) submitAction.onClick(data);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const renderDefaultComponent = field => {
    // if (classes) classnames.bind(classes);
    const { name, type, placeholder, validation } = field;

    return (
      <div className={styles.fieldInput}>
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

  const renderCustomComponent = field => {
    const { customComponent } = field;
    return <div>{customComponent()}</div>;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {props.items.map((field, index) => {
        const { label, name, type, size } = field;

        return (
          <div
            key={index}
            className={classnames(styles.field, styles[size ?? 'col-12'])}>
            <label>
              {label}
              {type === 'custom'
                ? renderCustomComponent(field)
                : renderDefaultComponent(field)}

              <div className={styles.fieldValidation}>
                {errors[name] && <p>{errors[name].message}</p>}
              </div>
            </label>
          </div>
        );
      })}

      <div className={styles.actionGroup}>
        {!!_.filter(props.actions, { type: 'primary' }).length && (
          <div className={styles.primaryAction}>
            {_.filter(props.actions, { type: 'primary' }).map(button =>
              button.actionType === 'submit' ? (
                <input
                  key={shortid.generate()}
                  type="submit"
                  value={button.label}
                />
              ) : (
                <button
                  key={shortid.generate()}
                  className={classnames({ disabled: button.disabled })}
                  onClick={button.onClick}>
                  {button.label}
                </button>
              )
            )}
          </div>
        )}

        {!!_.filter(props.actions, { type: 'secondary' }).length && (
          <div className={styles.secondaryAction}>
            {_.filter(props.actions, { type: 'secondary' }).map(button => (
              <button key={shortid.generate()} onClick={button.onClick}>
                {button.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {!!_.filter(props.actions, { type: 'tertiary' }).length && (
        <div className={styles.tertiaryAction}>
          {_.filter(props.actions, { type: 'tertiary' }).map(button =>
            button.linkTo ? (
              <a key={shortid.generate()} href={button.linkTo}>
                {button.label}
              </a>
            ) : (
              <button key={shortid.generate()} onClick={button.onClick}>
                {button.label}
              </button>
            )
          )}
        </div>
      )}
    </form>
  );
});
