import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import shortid from 'shortid';

import _ from 'lodash';

//styles
import * as styles from './styles.module.scss';

//components
import Button from '../Button';
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
    let submitAction = _.find(props.actions, { useSubmitBehavior: true });
    if (submitAction) submitAction.onClick(data);
  };

  const handlePasswordVisibility = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const renderDefaultComponent = field => {
    // if (classes) classnames.bind(classes);
    const { name, type, placeholder, validation } = field;

    return (
      <div
        className={classnames(styles.fieldInput, {
          'input-field--error': !!errors[name]
        })}>
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
            key={'input-field-' + index}
            className={classnames(styles.field, styles[size ?? 'col-12'])}>
            <label>
              {label}
              {type === 'custom'
                ? renderCustomComponent(field)
                : renderDefaultComponent(field)}

              <div className={styles.fieldValidation}>
                {errors[name] && <p>{errors[name]?.message}</p>}
              </div>
            </label>
          </div>
        );
      })}

      <div className={styles.actionGroup}>
        {!!_.filter(props.actions, { type: 'primary' }).length && (
          <div className={styles.primaryAction}>
            {_.filter(props.actions, { type: 'primary' }).map(button => (
              <Button
                key={shortid.generate()}
                disabled={button.disabled}
                text={button.label}
                type="primary"
                useSubmitBehavior={button.useSubmitBehavior}
                onClick={!button.useSubmitBehavior ? button.onClick : undefined}
              />
            ))}
          </div>
        )}

        {!!_.filter(props.actions, { type: 'secondary' }).length && (
          <div className={styles.secondaryAction}>
            {_.filter(props.actions, { type: 'secondary' }).map(button => (
              <Button
                key={shortid.generate()}
                text={button.label}
                type="secondary"
                onClick={button.onClick}
              />
            ))}
          </div>
        )}
      </div>

      {!!_.filter(props.actions, { type: 'tertiary' }).length && (
        <div className={styles.tertiaryAction}>
          {_.filter(props.actions, { type: 'tertiary' }).map(button => (
            <Button
              key={shortid.generate()}
              text={button.label}
              type="tertiary"
              linkTo={button.linkTo}
              onClick={button.onClick}
            />
          ))}
        </div>
      )}
    </form>
  );
});
