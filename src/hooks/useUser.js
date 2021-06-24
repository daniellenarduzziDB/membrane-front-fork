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
          sessionStorage.setItem('auth-token', token);

          setJWT(token);
          setAuthorizationHeader(token);
          setTwoFactorAuth(twoFactorAuth);
        })
        .catch(error => {
          throw new Error(Utils.parseApiError(error));
        });
    },
    [setJWT, setTwoFactorAuth]
  );

  const singOut = useCallback(() => {
    sessionStorage.removeItem('auth-token');
    setJWT(null);
  }, [setJWT]);

  const twoFactorSignIn = useCallback(payload => {
    return loginTwoFactor(payload).catch(error => {
      throw new Error(Utils.parseApiError(error));
    });
  }, []);

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
