import bcrypt from 'bcrypt'
import CustomError from './error'

const { BC_SALT_ROUND } = process.env as {
  BC_SALT_ROUND: string
}

export const hash = async (plainText: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(Number(BC_SALT_ROUND))
    const hash = await bcrypt.hash(plainText, salt)
    return hash
  } catch (e) {
    throw new CustomError(i18n.__('error-hashing-password'))
  }
}

export const compare = async (plainText: string, hash: string): Promise<boolean> => {
  try {
    const result = await bcrypt.compare(plainText, hash)
    return result
  } catch (e) {
    throw new CustomError(i18n.__('error-incorrect-credentials'))
  }
}
