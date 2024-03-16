import { AppDataSource } from '../database/postgres'
import { Tokens } from '../entity/tokens'

export const tokenRepository = AppDataSource.getRepository(Tokens)
