import request from '../utils/request'

export interface AccountCreationRequest {
  username: string
  password: string
  roles: string[]
}

export const defaultAccountCreationRequest: AccountCreationRequest = {
  username: '',
  password: '',
  roles: ['admin']
}

export interface AccountPasswordUpdateRequest {
  password: string
}

export const defaultAccountPasswordUpdateRequest: AccountPasswordUpdateRequest = {
  password: ''
}

export default {
  async getAllAccounts () {
    return await request.get<Account.AccountInfo[]>('/users')
  },

  async getAccount (id: number) {
    return await request.get<Account.AccountInfo>(`/user/${id}`)
  },

  async createAccount (data: AccountCreationRequest) {
    return await request.post<Account.AccountInfo>('/user', data)
  },

  async updateAccountPassword (id: number, data: AccountPasswordUpdateRequest) {
    return await request.put<''>(`/user/${id}/password`, data)
  },

  async deleteAccount (id: number) {
    return await request.delete<''>(`/user/${id}`)
  }
}
