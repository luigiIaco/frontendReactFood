//Url globali
const SERVER_URL = "https://api.spoonacular.com";
const BACKEND_URL = "http://localhost:3000";

//recipesUrl
const recipesUrl = "/recipes/random";
const recipesUrlSearch = "/recipes/complexSearch";
const recipesUrlInformation = (id) => `/recipes/${id}/information`;
const recipesUrlPrice = (id) => `/recipes/${id}/priceBreakdownWidget.json`;

//auth url
const recoverPassUrl = "/auth/recoverPassword";
const resetPassUrl = "/auth/resetPassword";
const registerUrl = "/auth/register";
const loginUrl = "/auth/login";

//product Url
const addCartUrl = "/product/insertCart";
const getCartUrl = "/product/getCart";
const removeAllCartUrl = "/product/removeAllCart";
const removeFromCartUrl = (id) => `/product/removeCart/${id}`;

const generateUrlApi = (url, params = []) => {
  const urlServerWithAuth = `${SERVER_URL}${url}?apiKey=${process.env.REACT_APP_API_KEY}`;
  if (params && params.length > 0) {
    let paramsUrl = new URLSearchParams();
    params.forEach((p) => {
      paramsUrl.append(p.key, p.value);
    });

    return urlServerWithAuth + `&${paramsUrl.toString()}`;
  }

  return urlServerWithAuth;
};

const generateUrlBackend = (url, params = []) => {
  const urlBackend = `${BACKEND_URL}${url}`;
  return urlBackend;
};

export {
  recipesUrl,
  recipesUrlSearch,
  registerUrl,
  loginUrl,
  recoverPassUrl,
  resetPassUrl,
  addCartUrl,
  getCartUrl,
  removeAllCartUrl,
  removeFromCartUrl,
  generateUrlApi,
  recipesUrlInformation,
  recipesUrlPrice,
  generateUrlBackend,
};
