import { JwtPayload } from 'jsonwebtoken'
import { Tokens } from '../entity/tokens'
import { Users } from '../entity/users'
import { tokenRepository } from '../repositories/tokens.repositories'
import CustomError from './error'

export const generateSession = async (payload: JwtPayload, user: Users): Promise<void> => {
  const tokenEntry = new Tokens()
  tokenEntry.jti = payload.jti as string
  tokenEntry.expiresAt = payload.exp as number
  tokenEntry.user = user

  await tokenRepository.save(tokenEntry).catch(_ => {
    throw new CustomError(i18n.__('model-not-save').replace('[model]', 'Tokens'))
  })
}
