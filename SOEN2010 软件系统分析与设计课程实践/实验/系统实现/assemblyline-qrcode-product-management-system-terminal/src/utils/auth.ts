const TOKEN_KEY = 'access_token'

export function getToken () {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken (token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function isLoggedIn () {
  return getToken() !== null && getToken() !== ''
}
