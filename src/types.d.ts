export interface UserEntry {
  id: number
  identification: string
  firstName: string
  lastName: string
  birthday: string
  email: string
  username: string
  password: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export type NonSensitiveUserEntry = Omit<UserEntry, 'username' | 'password'>

export type NonSensitiveJWTUserEntry = Omit<NonSensitiveUserEntry, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>
