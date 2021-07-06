import React, { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classnames from 'classnames';
import _ from 'lodash';

//styles
import * as styles from './styles.module.scss';

//components
import Field from './Field';
import Button from '../Button';

export default memo(function Form(props) {
  //bind styles
  classnames.bind(styles);

  //hook form
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    setValue,
    setFocus,
    watch,
    trigger,
    formState: { isDirty, isSubmitted, errors }
  } = useForm();

  // useEffect(() => {
  //   props.items.map(item => {
  //     item.uid = shortid.generate();
  //   });
  // }, []);

  useEffect(() => {
    if (props.customError) {
      const { field, type, message } = props.customError;
      errors[field] = { type, message };
      setError(field, { type, message });
    }
    // eslint-disable-next-line
  }, [errors, props.customError]);

  const onSubmit = (data, e) => {
    let submitAction = _.find(props.actions, { useSubmitBehavior: true });
    if (submitAction) submitAction.onClick(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {props.items.map((field, index) => {
        return (
          <Field
            key={index}
            {...field}
            formState={{
              isDirty,
              isSubmitted,
              errors,
              watch,
              trigger,
              register,
              getValues,
              setValue
            }}
          />
        );
      })}

      <div className={styles.actionGroup}>
        {!!_.filter(props.actions, { type: 'primary' }).length && (
          <div className={styles.primaryAction}>
            {_.filter(props.actions, { type: 'primary' }).map(
              (button, index) => (
                <Button
                  key={'btn-primary-' + index}
                  disabled={button.disabled}
                  text={button.label}
                  type="primary"
                  useSubmitBehavior={button.useSubmitBehavior}
                  onClick={
                    !button.useSubmitBehavior ? button.onClick : undefined
                  }
                />
              )
            )}
          </div>
        )}

        {!!_.filter(props.actions, { type: 'secondary' }).length && (
          <div className={styles.secondaryAction}>
            {_.filter(props.actions, { type: 'secondary' }).map(
              (button, index) => (
                <Button
                  key={'btn-secondary-' + index}
                  text={button.label}
                  type="secondary"
                  onClick={button.onClick}
                />
              )
            )}
          </div>
        )}
      </div>

      {!!_.filter(props.actions, { type: 'tertiary' }).length && (
        <div className={styles.tertiaryAction}>
          {_.filter(props.actions, { type: 'tertiary' }).map(
            (button, index) => (
              <Button
                key={'btn-tertiary-' + index}
                text={button.label}
                type="tertiary"
                linkTo={button.linkTo}
                onClick={button.onClick}
              />
            )
          )}
        </div>
      )}
    </form>
  );
});
