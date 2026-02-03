import {
  recipesUrl,
  recipesUrlSearch,
  recipesUrlInformation,
  recipesUrlPrice,
  generateUrlApi,
  generateUrlBackend,
  addCartUrl,
  getCartUrl,
  removeFromCartUrl,
  removeAllCartUrl,
} from "../url";
import { deleteService, getService, postService } from "../http.service";

const getRecipesInformation = async (id) => {
  const url = generateUrlApi(recipesUrlInformation(id));
  return getService(url);
};

const getRecipesPrice = async (id) => {
  const url = generateUrlApi(recipesUrlPrice(id));
  return getService(url);
};

const getPopularService = async (n, tags) => {
  const params = [
    { key: "number", value: n },
    { key: "tags", value: tags },
  ];

  const url = generateUrlApi(recipesUrl, params);
  return getService(url);
};

const getCousineComplexSearch = async (n, cuisine, query = "") => {
  const params = [
    { key: "number", value: n },
    { key: "cuisine", value: cuisine },
    { key: "query", value: query },
  ];
  const url = generateUrlApi(recipesUrlSearch, params);
  return getService(url);
};

const addCart = async (data) => {
  const url = generateUrlBackend(addCartUrl);
  return postService(url, data);
};

const getCart = async (username) => {
  const url = generateUrlBackend(getCartUrl);
  return postService(url, username);
};

const removeCartById = async (data) => {
  const url = generateUrlBackend(removeFromCartUrl(data.productId));
  return deleteService(url, {cartId:data.cartId,quantityToRemove:data.quantityToRemove});
};

const removeAllCart = async (username) => {
  const url = generateUrlBackend(removeAllCartUrl);
  return deleteService(url, username);
};

export {
  getPopularService,
  getCousineComplexSearch,
  getRecipesInformation,
  getRecipesPrice,
  addCart,
  getCart,
  removeCartById,
  removeAllCart
};
