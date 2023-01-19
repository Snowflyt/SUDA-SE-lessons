import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const myAxios = axios.create({
  baseURL: isDev ? 'http://localhost:8083' : 'http://localhost:8083'
})

// Add a request interceptor
myAxios.interceptors.request.use(
  config => {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${window.localStorage.getItem('token')}`
    }
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
myAxios.interceptors.response.use(
  res => {
    // 未登录则跳转到登录页
    if (res?.data?.code === 40100) {
      const redirectUrl = window.location.href
      window.location.href = `/user/login?redirect=${redirectUrl}`
    }
    // 更新token
    if (res.headers.Authorization) {
      window.localStorage.setItem('token', res.headers.Authorization)
    }
    // Do something with response data
    return res.data
  },
  error => {
    // Do something with response error
    return Promise.reject(error)
  }
)

export default myAxios
