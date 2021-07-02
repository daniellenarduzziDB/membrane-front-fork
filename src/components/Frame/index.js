import { memo, useState } from 'react';
import classnames from 'classnames';

//styles
import * as styles from './styles.module.scss';

//components
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default memo(function Frame({ children }) {
  classnames.bind(styles);

  //state
  const [openNotification, setOpenNotification] = useState(false);

  const handleNotification = () => {
    setOpenNotification(!openNotification);
  };

  return (
    <div>
      <Header handleNotification={handleNotification} />
      <Sidebar
        open={openNotification}
        handleNotification={handleNotification}
      />
      <div className={styles.mainContent}>{children}</div>
      <Footer />
    </div>
  );
});
