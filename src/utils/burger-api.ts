import {
  TIngredient,
  TOrderFetch,
  TRegisterData,
  TTokenData,
  TUser,
} from "../services/types/data";
import { ApiUrl } from "./constants";

type TResponseBody<TDataType = {}> = TDataType;

interface CustomBody<T extends any> extends Body {
  json(): Promise<T>;
}

interface CustomResponse<T> extends CustomBody<T> {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly trailer: Promise<Headers>;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}
function request(url: string, options: { [key: string]: any }) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
}

function basePostFetch(addUrl: string, bodyObject: { [key: string]: any }) {
  return request(`${ApiUrl + addUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  });
}

function getIngredients(): Promise<
  TResponseBody<{
    success: boolean;
    data: Array<TIngredient>;
  }>
> {
  return request(`${ApiUrl}/ingredients`, {});
}

function getUser(accessToken: string): Promise<
  TResponseBody<{
    success: boolean;
    user: TUser;
  }>
> {
  return request(`${ApiUrl}/auth/user`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
  });
}

function patсhUser(
  accessToken: string,
  userDataObj: {
    name: string;
    email: string;
    password: string;
    from: string;
  }
): Promise<
  TResponseBody<{
    success: boolean;
    user: TUser;
  }>
> {
  return request(`${ApiUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify(userDataObj),
  });
}

function postOrder(
  ingridientsIdArray: Array<string>,
  accessToken: string | undefined
): Promise<
  TResponseBody<{ success: boolean; name: string; order: TOrderFetch }>
> {
  return request(`${ApiUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify({ ingredients: ingridientsIdArray }),
  });
}

function postLogin(loginDataObj: {
  email: string;
  password: string;
  from: string;
}): Promise<TResponseBody<TRegisterData>> {
  return basePostFetch("/auth/login", loginDataObj);
}

function postRegister(registerDataObj: {
  name: string;
  email: string;
  password: string;
  from: string;
}): Promise<TResponseBody<TRegisterData>> {
  return basePostFetch("/auth/register", registerDataObj);
}

function postForgotPassword(forgotPasswordDataObj: {
  email: string;
  from: string;
}): Promise<TResponseBody<{ success: boolean; message: string }>> {
  return basePostFetch("/password-reset", forgotPasswordDataObj);
}

function postResetPassword(resetPasswordDataObj: {
  token: string;
  password: string;
  from: string;
}): Promise<TResponseBody<{ success: boolean; message: string }>> {
  return basePostFetch("/password-reset/reset", resetPasswordDataObj);
}

function postToken(
  refreshToken: string
): Promise<TResponseBody<TTokenData & { success: boolean }>> {
  return basePostFetch("/auth/token", {
    token: refreshToken,
  });
}
function logoutRequest(
  refreshToken: string
): Promise<CustomResponse<TResponseBody>> {
  return basePostFetch("/auth/logout", {
    token: refreshToken,
  });
}

export {
  getIngredients,
  postOrder,
  postLogin,
  postRegister,
  postForgotPassword,
  postResetPassword,
  postToken,
  getUser,
  patсhUser,
  logoutRequest,
};
