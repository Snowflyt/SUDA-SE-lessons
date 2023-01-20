import { ref, Ref } from 'vue'
import cookies from 'js-cookie'
import accountApi from '~~/apis/account'

const TOKEN_KEY = 'access_token'

const accountInfo: Ref<Account.AccountDto> = ref({
  id: 0,
  username: '',
  email: '',
  phone: '',
  roles: []
})

export function getToken () {
  return cookies.get(TOKEN_KEY)
}

export function setToken (token: string) {
  cookies.set(TOKEN_KEY, token)
}

export function isLoggedIn () {
  const isLogin = getToken() !== null && getToken() !== ''
  if (isLogin && accountInfo.value.username === '') {
    accountApi.getCurrentAccount().then(res => {
      setAccountInfo(res)
    })
  }
  return isLogin
}

export function logout () {
  cookies.set(TOKEN_KEY, '')
}

export function getAccountInfo () {
  return accountInfo
}

export function setAccountInfo (info: Account.AccountDto) {
  accountInfo.value.id = info.id
  accountInfo.value.username = info.username
  accountInfo.value.email = info.email
  accountInfo.value.phone = info.phone
  accountInfo.value.roles = info.roles
}
