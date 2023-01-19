import loginApi from '../../src/apis/login'

const login = async () => {
  await loginApi.login({
    username: 'su',
    password: '1234'
  })
}

export { login }
