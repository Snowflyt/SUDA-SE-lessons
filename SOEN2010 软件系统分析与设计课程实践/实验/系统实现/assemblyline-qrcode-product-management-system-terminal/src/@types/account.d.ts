declare namespace Account {
  type Role = 'admin'

  interface RoleInfo {
    id: number
    name: string
    description: string
  }

  interface AccountInfo {
    id: number
    username: string
    email: string
    phone: string
    roles: Role[]
  }
}
