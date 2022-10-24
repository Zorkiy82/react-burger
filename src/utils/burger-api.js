import { ApiUrl } from "./constants.js";

// TODO Можно сделать универсальную функцию запроса с проверкой ответа,
// чтобы не дублировать эту проверку в каждом запросе:

// function request(url, options) {
//   // принимает два аргумента: урл и объект опций
//   return fetch(url, options).then(checkResponse)
// }
// И теперь просто нужно заменить все fetch на request. Все остальное будет без изменений. Код станет чище

function checkReponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
}

function basePostFetch(addUrl, bodyObject) {
  return fetch(`${ApiUrl + addUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyObject),
  }).then(checkReponse);
}

function getIngredients() {
  return fetch(`${ApiUrl}/ingredients`).then(checkReponse);
}

function getUser(accessToken) {
  return fetch(`${ApiUrl}/auth/user`, {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
  }).then(checkReponse);
}

function patсhUser(accessToken, userDataObj) {
  return fetch(`${ApiUrl}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify(userDataObj),
  }).then(checkReponse);
}

function postOrder(ingridientsIdArray, accessToken) {
  return fetch(`${ApiUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify({ ingredients: ingridientsIdArray }),
  }).then(checkReponse);
}

function postLogin(loginDataObj) {
  return basePostFetch("/auth/login", loginDataObj);
}

function postRegister(registerDataObj) {
  return basePostFetch("/auth/register", registerDataObj);
}

function postForgotPassword(forgotPasswordDataObj) {
  return basePostFetch("/password-reset", forgotPasswordDataObj);
}

function postResetPassword(resetPasswordDataObj) {
  return basePostFetch("/password-reset/reset", resetPasswordDataObj);
}

function postToken(refreshToken) {
  return basePostFetch("/auth/token", {
    token: refreshToken,
  });
}
function logoutRequest(refreshToken) {
  basePostFetch("/auth/logout", {
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
