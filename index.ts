import 'reflect-metadata'

import 'dotenv/config'
import i18n from './src/config/i18n'
import { AppDataSource } from './src/database/postgres'
import server from './src/server'

const { PORT } = process.env as {
  PORT: string
}

const main = async (): Promise<void> => {
  /* Connection Database */
  await AppDataSource.initialize().then((_: any) => {
    console.info(i18n.__('connection-db-successfully'))
  }).catch(_ => console.error(`${i18n.__('connection-db-error')}`))

  /* Server Listen */
  server.listen(Number(PORT), () => {
    console.info(`${i18n.__('server-started')} ${Number(PORT)}`)
  })
}

void main()
