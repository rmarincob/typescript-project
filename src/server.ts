import 'dotenv/config'

import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import { description, version } from '../package.json'
import i18n from './config/i18n'
import baseRoutes from './routes/base.routes'
import CustomError from './utils/error'

const app: Express = express()

/* config middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const { MODE } = process.env as {
  MODE: string
}

/* cors */
app.use(cors())

/* translate */
app.use(i18n.init)

/* config middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req: Request, _: Response, next: NextFunction) => {
  const lang = req.acceptsLanguages(['es', 'en'])

  if (lang === 'es' || lang === 'en') i18n.setLocale(lang)
  else i18n.setLocale('es')

  next()
})

/* routing */
app.use(baseRoutes)

app.get('/', (_: Request, res: Response) => {
  res.status(res.statusCode).send({ code: res.statusCode, message: `${description} (v${version} - ${MODE})` })
})

/* handle error */
app.use((req: Request, _: Response, next: NextFunction) => {
  const err = new CustomError(req.__('resource-not-found'), 404)
  next(err)
})

app.use((err: any, _: Request, res: Response, next: NextFunction) => {
  return res.status(err.code).send({
    code: err.code,
    success: err.success,
    message: err.message
  })
})

export default app
