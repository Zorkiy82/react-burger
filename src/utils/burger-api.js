import { ApiUrl } from "./constants.js";

function checkReponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
}

function getIngredients() {
  return fetch(`${ApiUrl}/ingredients`).then(checkReponse);
}

function postOrder(ingridientsIdArray) {
  return fetch(`${ApiUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: ingridientsIdArray }),
  }).then(checkReponse);
}

export { getIngredients, postOrder };
