import { memo, useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import Splash from '../../components/Splash';

import PersonalInformation from './steps/PersonalInformation';
import Password from './steps/Password';
import Security from './steps/Security';

export default memo(function SignUp(props) {
  const STEPS = {
    PERSONAL_INFORMATION: 0,
    SECURITY_CODE: 1,
    PASSWORD: 2
  };

  //states
  const [step, setStep] = useState(STEPS.PERSONAL_INFORMATION);
  const [userInfo, setUserInfo] = useState({});

  //bind styles
  classnames.bind(styles);

  const renderStep = () => {
    return step === STEPS.PERSONAL_INFORMATION
      ? renderStepPersonalInformation()
      : step === STEPS.SECURITY_CODE
      ? renderStepSecurityCode()
      : renderStepPassword();
  };

  const renderStepPersonalInformation = () => {
    return (
      <PersonalInformation
        onComplete={data => {
          setUserInfo(data);
          setStep(STEPS.SECURITY_CODE);
        }}
      />
    );
  };

  const renderStepSecurityCode = () => {
    return (
      <Security
        {...props}
        userInfo={userInfo}
        onComplete={() => setStep(STEPS.PASSWORD)}
      />
    );
  };

  const renderStepPassword = () => {
    return (
      <Password
        onBack={() => setStep(STEPS.PERSONAL_INFORMATION)}
        onComplete={() => {}}
      />
    );
  };

  return (
    <Splash>
      <div className={styles.signUpContainer}>
        <h2>Sign Up</h2>
        {renderStep()}
      </div>
    </Splash>
  );
});
