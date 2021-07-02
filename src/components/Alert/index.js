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

const alertIcons = {
  info: infoIcon,
  error: errorIcon,
  success: successIcon,
  warning: warningIcon
};

export default memo(function Alert({ displayAlert, type, message, lifetime }) {
  const [playAnimate, setPlayAnimate] = useState(false);

  //bind styles
  classnames.bind(styles);

  useEffect(() => {
    if (displayAlert)
      setTimeout(() => {
        setPlayAnimate(true);
      }, 50);
  }, [displayAlert]);

  const animateStyle = y => {
    let defaultStyle = {
      left: '50%',
      position: 'fixed'
    };

    return {
      ...defaultStyle,
      transform: `translateY(${y}px)`
    };
  };

  return (
    displayAlert && (
      <Animate
        play={playAnimate}
        start={animateStyle(-80)}
        end={animateStyle(20)}
        duration={0.5}
        onComplete={() => {
          setTimeout(() => {
            setPlayAnimate(false);
          }, lifetime - 1000);
        }}>
        <div className={classnames(styles.alert, styles[type])}>
          <FontAwesomeIcon icon={alertIcons[type]} />
          {message}
        </div>
      </Animate>
    )
  );
});
