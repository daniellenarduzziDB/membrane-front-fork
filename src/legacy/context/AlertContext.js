import React, { useEffect, useState } from 'react';

//components
import Alert from '../components/Alert';

const AlertContext = React.createContext({});
const defaultTimeOut = 5000;

export function AlertContextProvider({ children }) {
  const [alert, setAlert] = useState(null);
  const [displayAlert, setDisplayAlert] = useState(false);

  useEffect(() => {
    const timer = () =>
      setTimeout(
        () => setDisplayAlert(false),
        alert.lifetime ? alert.lifetime : defaultTimeOut
      );

    if (alert) {
      timer();
      setDisplayAlert(true);
    }
  }, [alert]);

  return (
    <AlertContext.Provider value={{ setAlert }}>
      <Alert displayAlert={displayAlert} {...alert} />
      {children}
    </AlertContext.Provider>
  );
}

export default AlertContext;
