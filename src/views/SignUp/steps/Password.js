import { memo, useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from '../styles.module.scss';

//components
import Form from '../../../components/Form';

//hooks
import useUser from '../../../hooks/useUser';
import useNotification from '../../../hooks/useNotification';

export default memo(function Password(props) {
  //bind styles
  classnames.bind(styles);

  //hook user
  const { activate } = useUser();
  const [pushNotification] = useNotification();

  //states
  const [customError, setCustomError] = useState('');

  const onSubmit = data => {
    const { password, repeatPassword } = data;

    if (password !== repeatPassword)
      setCustomError({
        field: 'repeatPassword',
        type: 'custom',
        message: 'The password does not match'
      });
    else {
      activate({ password })
        .then(() => {
          props.history.push('/sign-in');
          pushNotification({
            type: 'success',
            message: `You have successfully signed up on Membrane! Proceed to login to start the onboarding.`,
            lifetime: 5000
          });
        })
        .catch(error => {
          pushNotification({
            type: 'error',
            message: error.message,
            lifetime: 5000
          });
        });
    }
  };

  return (
    <>
      <label>Please, set up your password</label>
      <span>*Required fields</span>
      <div className={styles.signUpForm}>
        <Form
          customError={customError}
          items={[
            {
              label: 'Password *',
              name: 'password',
              placeholder: 'Be sure yo use a strong password',
              type: 'password-secure'
            },
            {
              label: 'Repeat Password *',
              name: 'repeatPassword',
              placeholder: 'Repeat your password',
              type: 'password',
              validation: {
                required: 'This field is required'
              }
            }
          ]}
          actions={[
            {
              type: 'primary',
              useSubmitBehavior: true,
              label: 'Next',
              onClick: onSubmit
            },
            {
              type: 'secondary',
              label: 'Back',
              onClick: () => props.onBack()
            }
          ]}
        />
      </div>
    </>
  );
});
