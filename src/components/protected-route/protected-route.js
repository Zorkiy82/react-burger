import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isHasTokens } from "../../utils/utils";
import { checkAuth } from "../../utils/utils";

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  }, [dispatch, isAuthorized]);

  return (
    <Route
      {...rest}
      render={({ location }) =>
      isAuthorized ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
