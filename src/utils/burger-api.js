import { ApiUrl } from "./constants.js";

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

function getUserData(accessToken) {
  return fetch(`${ApiUrl}/auth/user`, {
    method: "GET",
    // mode: 'cors',
    // cache: 'no-cache',
    // credentials: 'same-origin',
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
    },
    // redirect: 'follow',
    // referrerPolicy: 'no-referrer'
  }).then(checkReponse);
}

function postOrder(ingridientsIdArray) {
  return basePostFetch("/orders", { ingredients: ingridientsIdArray });
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

export {
  getIngredients,
  postOrder,
  postLogin,
  postRegister,
  postForgotPassword,
  postResetPassword,
  postToken,
  getUserData,
};
