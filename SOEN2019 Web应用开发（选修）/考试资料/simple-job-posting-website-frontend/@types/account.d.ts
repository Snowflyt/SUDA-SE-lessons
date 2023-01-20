declare namespace Account {
  type Role = 'admin' | 'user'

  interface RoleDto {
    id: number
    name: string
    description: string
  }

  interface AccountDto {
    id: number
    username: string
    email: string
    phone: string
    roles: Role[]
  }
}
