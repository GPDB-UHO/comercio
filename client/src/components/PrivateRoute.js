import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useLoginContext } from "contexts/login";

export default function PrivateRoute({ children, ...rest }) {
  const { loginState } = useLoginContext();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        [400, 401].includes(loginState.status) ? (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        ) : (
          children
        )
      }
    />
  );
}
