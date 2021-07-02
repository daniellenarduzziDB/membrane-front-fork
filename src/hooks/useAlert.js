import { useCallback, useContext } from 'react';

//context
import AlertContext from '../context/AlertContext';

export default function useAlert() {
  const { setAlert } = useContext(AlertContext);

  const pushAlert = useCallback(alert => setAlert(alert), [setAlert]);

  return [pushAlert];
}
