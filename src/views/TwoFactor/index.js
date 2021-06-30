import { memo, useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//hooks
import useUser from '../../hooks/useUser';

//components
import Form from '../../components/Form';
import Splash from '../../components/Splash';
import DigitCode from '../../components/DigitCode';

export default memo(function TwoFactor(props) {
  //hook user
  const { twoFactorAuth, twoFactorSignIn, requestNewSecurityCode, clearToken } =
    useUser();

  //states
  const [customError, setCustomError] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [codeComplete, setCodeComplete] = useState(false);

  //bind styles
  classnames.bind(styles);

  const onSignIn = () => {
    const payload = { code: codeValue };

    twoFactorSignIn(payload)
      .then(() => {
        props.history.push('/dashboard');
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
    <Splash>
      <div className={styles.twoFactorContainer}>
        <h2>Two-Factor Authentication</h2>
        <label>
          Please enter below the 6-digit security code. You will get it
          through&nbsp;{twoFactorAuth?.type} to your ********
          {twoFactorAuth?.clue}&nbsp;
          {twoFactorAuth?.type === 'SMS' ? 'phone' : 'email account'}.
        </label>

        <div className={styles.twoFactorForm}>
          <Form
            customError={customError}
            items={[
              {
                label: 'Enter your 6-digit code',
                name: 'digit',
                type: 'custom',
                customComponent: () => {
                  return (
                    <DigitCode
                      digits={6}
                      onDigitCodeChange={onDigitCodeChange}
                    />
                  );
                }
              }
            ]}
            actions={[
              {
                type: 'primary',
                label: 'Sign In',
                disabled: !codeComplete,
                onClick: onSignIn
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
      </div>
    </Splash>
  );
});
