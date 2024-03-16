import jwt, { JwtPayload } from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { NonSensitiveJWTUserEntry } from '../types'

const { JWT_SECRET } = process.env as {
  JWT_SECRET: string
}

export const generateToken = async (whoami: NonSensitiveJWTUserEntry): Promise<string> => {
  const jti = uuidv4()
  const token = jwt.sign({ whoami, jti }, JWT_SECRET, {
    expiresIn: '1d'
  })

  return token
}

export const decodeToken = (token: any): JwtPayload => {
  return jwt.decode(token) as JwtPayload
}
