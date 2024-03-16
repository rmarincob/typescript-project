import { AppDataSource } from '../database/postgres'
import { Users } from '../entity/users'

export const userRepository = AppDataSource.getRepository(Users)
