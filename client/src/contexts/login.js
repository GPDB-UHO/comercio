import React, { createContext, useEffect, useContext } from "react";

import { verifyToken, useData } from "helpers";

const initialValue = { status: 100, user: null };

const LoginContext = createContext(initialValue);

export function LoginProvider({ children }) {
  const [state, setState] = useData(initialValue);

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");

    async function verifyAccessToken() {
      const response = await verifyToken(access_token);
      setState({ status: response.status });
    }
    verifyAccessToken();
  }, [setState]);

  return (
    <LoginContext.Provider
      value={{ loginState: state, setLoginState: setState }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext);
}
