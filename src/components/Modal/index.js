import classnames from 'classnames';
import { memo, useState} from 'react';
import Form from '../Form';



//components
import FontAwesomeIcon, { faTimes } from '../FontAwesomeIcon';

//styles
import * as styles from './styles.module.scss';

export default memo(function Modal({
  title,
  items,
  actions,
  onCancel
  }) {

  const handleCancelModal = () => {
    onCancel()
  }
  //bind styles
  classnames.bind(styles);
  
  return (
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <FontAwesomeIcon
            className={styles.modalIcon}
            icon={faTimes}
            color={'#FFFFFF'}
            onClick = {handleCancelModal}
          />
            {title}
          <Form
          items={items}
          actions={actions}
          />
        </div>
      </div>
    )
  }
)