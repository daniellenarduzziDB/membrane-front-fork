import classnames from 'classnames';
import { memo } from 'react';
import Form from '../Form';
import PropTypes from 'prop-types';


//components
import FontAwesomeIcon, { faTimes } from '../FontAwesomeIcon';

//styles
import * as styles from './styles.module.scss';

function Modal({
  title,
  description,
  items,
  actions,
  onCancel
}) {
  //bind styles
  classnames.bind(styles);

  const handleCancelModal = () => {
    onCancel();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <FontAwesomeIcon
          className={styles.modalIcon}
          icon={faTimes}
          color={'#FFFFFF'}
          onClick={handleCancelModal}
        />
        <h2>{title}</h2>
        <span>{description}</span>
        <Form
          items={items}
          actions={actions}
          />
      </div>
    </div>
  );
}

//#region props definitions
// default values and types
Modal.defaultProps = {
  title:'',
  description: '',
  items: []
};

Modal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.array,
  actions: PropTypes.array.isRequired
};
//#endregion

export default memo(Modal); 