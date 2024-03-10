const TOKEN_KEY = 'access_token';

export const getToken = () => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => {
  return getToken() !== null && getToken() !== '';
};
