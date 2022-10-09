import { accessTokenLifetime, refreshTokenLifetime } from "./constants";
import { SET_AUTORIZATION_DATA } from "../services/actions/profile";
import { postTokenData } from "../services/actions/token";

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props = {}) {
  props = {
    path: "/",
    ...props,
  };

  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export function setToken(res) {
  setCookie("accessToken", res.accessToken, { expires: accessTokenLifetime });
  setCookie("refreshToken", res.refreshToken, {
    expires: refreshTokenLifetime,
  });
}

export function isHasTokens() {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  return accessToken && refreshToken;
}

export const checkAuth = async (dispatch, state) => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  if (accessToken && refreshToken) {
    if (!state) {
      dispatch({ type: SET_AUTORIZATION_DATA, isAuthorized: true });
    }
  } else {
    if (refreshToken && !accessToken) {
      dispatch(postTokenData(refreshToken));
    } else {
      if (state) {
        dispatch({ type: SET_AUTORIZATION_DATA, isAuthorized: false });
      }
    }
  }
};
