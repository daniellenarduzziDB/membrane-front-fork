import { memo, useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//hooks
import useUser from '../../hooks/useUser';

//components
import Splash from '../../components/Splash';
import DigitCode from '../../components/DigitCode';

export default memo(function TwoFactor(props) {
  //hook user
  const { twoFactorAuth, twoFactorSignIn, requestNewSecurityCode, clearToken } =
    useUser();

  //states
  const [codeValue, setCodeValue] = useState('');
  const [codeComplete, setCodeComplete] = useState(false);
  const [error, setError] = useState('');

  //bind styles
  classnames.bind(styles);

  const onDigitCodeChange = (digitInput, value) => {
    setCodeValue(value);
    setCodeComplete(!digitInput.filter(digit => !digit.value).length);
  };

  const onSignIn = () => {
    const payload = { code: codeValue };

    twoFactorSignIn(payload)
      .then(() => {
        props.history.push('/dashboard');
      })
      .catch(error => setError(error?.message));
  };

  const onCancel = () => {
    clearToken();
    props.history.push('/sign-in');
  };

  const onRequestNewCode = () => {
    setError('');
    setCodeComplete(false);
    requestNewSecurityCode().catch(error => setError(error?.message));
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
        <div className={styles.digitCode}>
          <label>Enter your 6-digit code</label>
          <DigitCode digits={6} onDigitCodeChange={onDigitCodeChange} />

          <label className={styles.inputValidation}>{error}</label>

          <div className={styles.primaryAction}>
            <button onClick={onCancel}>Cancel</button>
            <button
              className={classnames({ disabled: !codeComplete })}
              onClick={onSignIn}>
              Sign In
            </button>
          </div>

          <div className={styles.tertiaryAction}>
            <button onClick={onRequestNewCode}>Send new code</button>
          </div>
        </div>
      </div>
    </Splash>
  );
});
