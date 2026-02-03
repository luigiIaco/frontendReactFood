import { postService, putService } from "../http.service";
import {
  generateUrlBackend,
  loginUrl,
  registerUrl,
  recoverPassUrl,
  resetPassUrl,
} from "../url";

const register = async (username, password, email) => {
  const url = generateUrlBackend(registerUrl);
  return postService(url, {
    username: username,
    password: password,
    email: email,
  });
};

const login = async (username, password, remember) => {
  const url = generateUrlBackend(loginUrl);
  return postService(url, {
    username: username,
    password: password,
    remember: remember,
  });
};

const recoveryPasswordByEmail = async (email) => {
  const url = generateUrlBackend(recoverPassUrl);
  return postService(url, { email: email });
};

const resetPassword = async (data) => {
  const url = generateUrlBackend(resetPassUrl);
  return putService(url, data);
};

export { register, login, recoveryPasswordByEmail, resetPassword };
