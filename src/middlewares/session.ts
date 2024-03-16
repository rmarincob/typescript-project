import { NextFunction, Request, Response } from 'express'

export const verifySession = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const username: string = req.body.username
  console.log(username)
  return next()
}
