import myAxios from '../plugins/myAxios'

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
    const res = await myAxios.post<LoginResponse, LoginResponse>('/login', data)
    window.localStorage.setItem('token', res.token)
    return res
  }
}
