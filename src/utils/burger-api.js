import { ApiUrl } from "./constants.js";

function checkReponse(res){
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
};

function getIngredients() {
  return fetch(ApiUrl).then(checkReponse);
}

export { getIngredients };
