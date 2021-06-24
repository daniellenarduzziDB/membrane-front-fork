import { memo, useEffect, useState } from 'react';
import { Animate } from 'react-simple-animate';
import classnames from 'classnames';

//components
import FontAwesomeIcon, {
  faInfoCircle as infoIcon,
  faTimesCircle as errorIcon,
  faCheckCircle as successIcon,
  faExclamationCircle as warningIcon
} from '../FontAwesomeIcon';

//styles
import * as styles from './styles.module.scss';

const notificationIcon = {
  info: infoIcon,
  error: errorIcon,
  success: successIcon,
  warning: warningIcon
};

export default memo(function Notification({
  displayNotification,
  type,
  message,
  lifetime
}) {
  const [playAnimate, setPlayAnimate] = useState(false);

  //bind styles
  classnames.bind(styles);

  useEffect(() => {
    if (displayNotification)
      setTimeout(() => {
        setPlayAnimate(true);
      }, 50);
  }, [displayNotification]);

  const animate = {
    onStart: { transform: 'translateY(-80px)' },
    onEnd: { transform: 'translateY(20px)' }
  };

  return (
    displayNotification && (
      <Animate
        play={playAnimate}
        start={animate.onStart}
        end={animate.onEnd}
        duration={0.25}
        onComplete={() => {
          setTimeout(() => {
            setPlayAnimate(false);
          }, lifetime - 1000);
        }}>
        <div className={classnames(styles.notification, styles[type])}>
          <FontAwesomeIcon icon={notificationIcon[type]} />
          {message}
        </div>
      </Animate>
    )
  );
});
