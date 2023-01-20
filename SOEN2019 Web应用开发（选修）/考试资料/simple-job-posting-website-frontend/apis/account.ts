import request from '~~/utils/request'

export interface AccountCreationRequest {
  username: string
  password: string
  phone: string
  email: string
}

export const defaultAccountCreationRequest: AccountCreationRequest = {
  username: '',
  password: '',
  phone: '',
  email: ''
}

export interface AccountPasswordUpdateRequest {
  password: string
}

export const defaultAccountPasswordUpdateRequest: AccountPasswordUpdateRequest = {
  password: ''
}

export default {
  async getAllAccounts () {
    return await request.get<Account.AccountDto[], Account.AccountDto[]>('/users')
  },

  async getCurrentAccount () {
    return await request.get<Account.AccountDto, Account.AccountDto>('/user/me')
  },

  async getAccount (id: number) {
    return await request.get<Account.AccountDto, Account.AccountDto>(`/user/${id}`)
  },

  async createAccount (data: AccountCreationRequest) {
    return await request.post<Account.AccountDto, Account.AccountDto>('/register', data)
  },

  async updateAccountPassword (id: number, data: AccountPasswordUpdateRequest) {
    return await request.put<'', ''>(`/user/${id}/password`, data)
  },

  async deleteAccount (id: number) {
    return await request.delete<'', ''>(`/user/${id}`)
  }
}
