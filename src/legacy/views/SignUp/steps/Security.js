import { memo, useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from '../styles.module.scss';

//components
import Form from '../../../components/Form';
import DigitCode from '../../../components/DigitCode';

//hooks
import useUser from '../../../hooks/useUser';

export default memo(function Security(props) {
  //bind styles
  classnames.bind(styles);

  //hook user
  const { twoFactorSignUp, requestNewSecurityCode, clearToken } = useUser();

  //states
  const [customError, setCustomError] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [codeComplete, setCodeComplete] = useState(false);

  const onSignUp = () => {
    const payload = { code: codeValue };

    twoFactorSignUp(payload)
      .then(() => {
        props.onComplete();
      })
      .catch(error =>
        setCustomError({
          field: 'digit',
          type: 'custom',
          message: error?.message
        })
      );
  };

  const onCancel = () => {
    clearToken();
    props.history.push('/sign-in');
  };

  const onRequestNewCode = () => {
    setCustomError('');
    setCodeComplete(false);
    requestNewSecurityCode().catch(error =>
      setCustomError({
        field: 'digit',
        type: 'custom',
        message: error?.message
      })
    );
  };

  const onDigitCodeChange = (digitInput, value) => {
    setCodeValue(value);
    setCodeComplete(!digitInput.filter(digit => !digit.value).length);
  };

  return (
    <>
      <label>
        Please confirm that your phone works. We just sent you a text message
        with a verification code to ******
        {props.userInfo.phoneNumber?.slice(-2)}.
      </label>
      <span>*Required fields</span>
      <div className={styles.signUpForm2FA}>
        <Form
          customError={customError}
          items={[
            {
              label: 'Enter your 6-digit code',
              name: 'digit',
              type: 'custom',
              customComponent: () => {
                return (
                  <DigitCode digits={6} onDigitCodeChange={onDigitCodeChange} />
                );
              }
            }
          ]}
          actions={[
            {
              type: 'primary',
              label: 'Sign In',
              disabled: !codeComplete,
              onClick: onSignUp
            },
            {
              type: 'secondary',
              label: 'Cancel',
              onClick: onCancel
            },
            {
              type: 'tertiary',
              label: 'Send new code',
              onClick: onRequestNewCode
            }
          ]}
        />
      </div>
    </>
  );
});
