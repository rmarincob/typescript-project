import { DataSourceOptions } from 'typeorm'

const { PG_HOST, PG_PORT, PG_USERNAME, PG_PASSWORD, PG_DB } = process.env as {
  PG_HOST: string
  PG_PORT: string
  PG_USERNAME: string
  PG_PASSWORD: string
  PG_DB: string
}

export const ORMPGConfigs: DataSourceOptions = {
  type: 'postgres',
  host: PG_HOST,
  port: Number(PG_PORT),
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DB,
  synchronize: true,
  logging: false,
  entities: [
    'src/entity/**/*.ts'
  ],
  migrations: [
    'src/migration/**/*.ts'
  ],
  subscribers: [
    'src/subscriber/**/*.ts'
  ]
}
