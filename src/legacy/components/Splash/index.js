import { memo } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

// import membraneLogo from '../../assets/logo_membrane.svg';

import { APP_NAME } from '../../contants/app';

export default memo(function Splash({ children }) {
  //bind styles
  classnames.bind(styles);

  return (
    <div className={styles.splash}>
      {/* <div className={styles.appTitle}>
        <img alt="membrane logo" src={membraneLogo} />
        {APP_NAME}
      </div> */}
      {children}
      <div className={styles.infoContainer}>
        <div>
          <h5>Contact Membrane Support</h5>
          <a href="mailto:support@membrane.com">support@membrane.com</a>
        </div>
        <div>
          <h5>Get the 2FA app</h5>
          <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">
            Google Authenticator
          </a>
        </div>
      </div>
    </div>
  );
});
