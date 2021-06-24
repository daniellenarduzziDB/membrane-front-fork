import React, { useEffect, useState } from 'react';

//components
import Notification from '../components/Notification';

const NotificationContext = React.createContext({});
const defaultTimeOut = 5000;

export function NotificationContextProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const [displayNotification, setDisplayNotification] = useState(false);

  useEffect(() => {
    const timer = () =>
      setTimeout(
        () => setDisplayNotification(false),
        notification.lifetime ? notification.lifetime : defaultTimeOut
      );

    if (notification) {
      timer();
      setDisplayNotification(true);
    }
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      <Notification
        displayNotification={displayNotification}
        {...notification}
      />
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
