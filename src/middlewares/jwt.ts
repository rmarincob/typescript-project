import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env as {
  JWT_SECRET: string
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const token: string | undefined = req.headers.authorization?.split(' ')[1]
  if (token === undefined) {
    return res.status(403).send({ code: 403, success: false, message: req.__('unauthorized') })
  }

  try {
    jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return res.status(401).send({ code: 401, success: false, message: req.__('unauthenticated') })
  }

  return next()
}
