import { useCallback, useContext } from 'react';

//context
import NotificationContext from '../context/NotificationContext';

export default function useNotification() {
  const { setNotification } = useContext(NotificationContext);

  const pushNotification = useCallback(
    notification => setNotification(notification),
    [setNotification]
  );

  return [pushNotification];
}
