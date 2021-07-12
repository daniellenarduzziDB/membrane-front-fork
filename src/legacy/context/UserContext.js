import React, { useState, useEffect } from 'react';

const UserContext = React.createContext({});

export function UserContextProvider({ children }) {
  const [jwt, setJWT] = useState(() => sessionStorage.getItem('auth-token'));
  const [twoFactorAuth, setTwoFactorAuth] = useState(null);

  useEffect(() => {}, [jwt]);

  return (
    <UserContext.Provider
      value={{
        jwt,
        setJWT,
        twoFactorAuth,
        setTwoFactorAuth
      }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
