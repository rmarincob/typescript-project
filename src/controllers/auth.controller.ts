import { NextFunction, Request, Response } from 'express'
import { Users } from '../entity/users'
import { userRepository } from '../repositories/users.repositories'
import { NonSensitiveJWTUserEntry, UserEntry } from '../types'
import { compare } from '../utils/bcrypt'
import CustomError from '../utils/error'
import { decodeToken, generateToken } from '../utils/jwt'
import { generateSession } from '../utils/session'

export const signIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { username, password } = req.body
    const userEntry: UserEntry = await userRepository.findOneByOrFail({ username }).catch(_ => {
      throw new CustomError(req.__('error-incorrect-credentials'), 401)
    })

    if (!await compare(password, userEntry.password)) {
      throw new CustomError(req.__('error-incorrect-credentials'), 401)
    }

    const user: NonSensitiveJWTUserEntry = (({ identification, firstName, lastName, birthday, email }) => ({ identification, firstName, lastName, birthday, email }))(userEntry)
    const token = await generateToken(user)

    await generateSession(decodeToken(token), userEntry as Users)

    return res.status(res.statusCode).send({ code: res.statusCode, success: true, message: req.__('message-success'), whoami: user, token })
  } catch (error) {
    next(error)
  }
}

export const whoami = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { authorization } = req.headers
    const payload = decodeToken(authorization?.split(' ')[1])

    const whoami: NonSensitiveJWTUserEntry = (({ identification, firstName, lastName, birthday, email }) => ({ identification, firstName, lastName, birthday, email }))(payload)

    return res.status(res.statusCode).send({ code: res.statusCode, success: true, message: req.__('message-success'), whoami })
  } catch (error) {
    next(error)
  }
}
