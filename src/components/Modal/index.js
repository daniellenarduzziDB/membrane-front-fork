import classnames from 'classnames';
import { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

//components
import FontAwesomeIcon, { faTimes } from '../FontAwesomeIcon';

//styles
import * as styles from './styles.module.scss';

function Modal({ title, visible, onShown, onHiding, children }) {
  //bind styles
  classnames.bind(styles);

  useEffect(() => {
    if (visible) if (onShown) onShown();
    // eslint-disable-next-line
  }, [visible]);

  const handleHiddingModal = () => {
    if (onHiding) onHiding();
  };

  if (!visible) return null;
  return (
    <div className={styles.modal}>
      <div className={styles.overlay}></div>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>

          <FontAwesomeIcon
            className={styles.modalIcon}
            icon={faTimes}
            color={'#FFFFFF'}
            onClick={handleHiddingModal}
          />
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );
}

//#region props definitions
// default values and types
Modal.defaultProps = {
  title: '',
  visible: false
};

Modal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  onShown: PropTypes.func,
  onHiding: PropTypes.func
};
//#endregion

export default memo(Modal);
