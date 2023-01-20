import { setAccountInfo, setToken } from '../utils/auth'
import request from '../utils/request'

export interface LoginRequest {
  username: string
  password: string
}

export const defaultLoginRequest: LoginRequest = {
  username: '',
  password: ''
}

export interface LoginResponse {
  token: string
  userId: number
  username: string
  email: string
  phone: string
  roles: Account.Role[]
}

export default {
  async login (data: LoginRequest): Promise<LoginResponse> {
    const res = await request.post<LoginResponse, LoginResponse>('/login', data)
    setToken(res.token)
    setAccountInfo({
      id: res.userId,
      username: res.username,
      email: res.email,
      phone: res.phone,
      roles: res.roles
    })
    return res
  }
}
