import { FC, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/hooks";
import { checkAuth } from "../../utils/utils";

export const ProtectedRoute: FC<any> = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(dispatch, isAuthorized);
  });

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
