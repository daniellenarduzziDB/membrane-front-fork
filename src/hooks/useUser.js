import { useCallback, useContext } from 'react';
import UserContext from '../context/UserContext';

//services
import { login, loginTwoFactor, requestNewCode } from '../services/signin';

//config
import { setAuthorizationHeader } from '../config/axios';

//utils
import Utils from '../lib/utils';

export default function useUser() {
  const { jwt, setJWT, twoFactorAuth, setTwoFactorAuth } =
    useContext(UserContext);

  const signIn = useCallback(
    payload => {
      return login(payload)
        .then(response => {
          const { token, twoFactorAuth } = response;

          setAuthorizationHeader(token);
          setTwoFactorAuth(twoFactorAuth);
        })
        .catch(error => {
          throw new Error(Utils.parseApiError(error));
        });
    },
    [setTwoFactorAuth]
  );

  const singOut = useCallback(() => {
    sessionStorage.removeItem('auth-token');
    setJWT(null);
  }, [setJWT]);

  const twoFactorSignIn = useCallback(
    payload => {
      return loginTwoFactor(payload)
        .then(response => {
          setJWT(response);
          sessionStorage.setItem('auth-token', response);
        })
        .catch(error => {
          throw new Error(Utils.parseApiError(error));
        });
    },
    [setJWT]
  );

  const requestNewSecurityCode = useCallback(() => {
    return requestNewCode().catch(error => {
      throw new Error(Utils.parseApiError(error));
    });
  }, []);

  const clearToken = () => {
    setJWT(null);
    sessionStorage.removeItem('auth-token');
  };

  return {
    jwt,
    twoFactorAuth,
    isLoggedIn: Boolean(jwt),
    signIn,
    singOut,
    twoFactorSignIn,
    requestNewSecurityCode,
    clearToken
  };
}
