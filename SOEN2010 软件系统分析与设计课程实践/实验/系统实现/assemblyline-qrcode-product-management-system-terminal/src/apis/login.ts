import { setToken } from '../utils/auth'
import request from '../utils/request'

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  userId: number
  username: string
  email: string | null
  address: string | null
  roles: string[]
}

export default {
  async login (data: LoginRequest): Promise<LoginResponse> {
    const res = await request.post<LoginResponse, LoginResponse>('/login', data)
    setToken(res.token)
    return res
  }
}
