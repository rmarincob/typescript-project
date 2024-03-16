import { DataSource } from 'typeorm'
import { ORMPGConfigs } from '../config/orm'

export const AppDataSource = new DataSource({ ...ORMPGConfigs })
