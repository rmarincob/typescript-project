import { NextFunction, Request, Response } from 'express'
import { userRepository } from '../repositories/users.repositories'
import { NonSensitiveUserEntry } from '../types'
import { hash } from '../utils/bcrypt'
import CustomError from '../utils/error'
import { Users } from '../entity/users'

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', sortDir = 'DESC' } = req.query

    const [response, total]: [NonSensitiveUserEntry[], Number] = await userRepository.findAndCount({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      order: {
        [String(sortBy)]: sortDir
      }
    })

    const pages = Math.ceil(Number(total) / Number(limit))
    const users = response.map(({ id, identification, firstName, lastName, birthday, email, isActive, createdAt, updatedAt }) => {
      return { id, identification, firstName, lastName, birthday, email, isActive, createdAt, updatedAt }
    })

    return res.status(res.statusCode).send({ code: res.statusCode, success: true, message: req.__('message-success'), page: Number(page), pages, total, data: users })
  } catch (error) {
    next(error)
  }
}

export const showUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params

    const user: NonSensitiveUserEntry = await userRepository.findOneByOrFail({ id: Number(id) })
      .then(({ id, identification, firstName, lastName, birthday, email, isActive, createdAt, updatedAt }: Users) => {
        return { id, identification, firstName, lastName, birthday, email, isActive, createdAt, updatedAt }
      }).catch(_ => {
        throw new CustomError(req.__('model-not-found').replace('[model]', 'Usuario'), 404)
      })

    return res.status(res.statusCode).send({ code: res.statusCode, success: true, message: req.__('message-success'), data: user })
  } catch (error) {
    next(error)
  }
}

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { identification, firstName, lastName, birthday, email, username, password } = req.body

    const passwordHash: string = await hash(password)
    await userRepository.save({ identification, firstName, lastName, birthday, email, username, password: passwordHash }).catch(_ => {
      throw new CustomError(req.__('model-not-save').replace('[model]', 'Usuario'))
    })

    return res.status(res.statusCode).send({ code: res.statusCode, success: true, message: req.__('message-success') })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params
    const { firstName, lastName, birthday, email, isActive } = req.body

    const user = await userRepository.findOneByOrFail({ id: Number(id) }).catch(_ => {
      throw new CustomError(req.__('model-not-found').replace('[model]', 'Usuario'), 404)
    })

    userRepository.merge(user, { firstName, lastName, birthday, email, isActive })
    await userRepository.save(user).catch(_ => {
      throw new CustomError(req.__('model-not-save').replace('[model]', 'Usuario'))
    })

    return res.status(res.statusCode).send({ code: res.statusCode, success: true, message: req.__('message-success') })
  } catch (error) {
    next(error)
  }
}

export const destroyUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { id } = req.params

    await userRepository.findOneByOrFail({ id: Number(id) }).catch(_ => {
      throw new CustomError(req.__('model-not-found').replace('[model]', 'Usuario'), 404)
    })

    await userRepository.softDelete(id).catch(_ => {
      throw new CustomError(req.__('model-not-save').replace('[model]', 'Usuario'))
    })

    return res.status(res.statusCode).send({ code: res.statusCode, success: true, message: req.__('message-success') })
  } catch (error) {
    next(error)
  }
}
