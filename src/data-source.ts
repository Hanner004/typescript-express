import 'reflect-metadata';
require('dotenv').config();
import { DataSource, DataSourceOptions } from 'typeorm';

import * as entities from './entities';
const entitiesList = Object.values(entities);

const { PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE } = process.env;

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: PGHOST,
  port: Number(PGPORT),
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  logging: false,
  synchronize: false,
  entities: entitiesList,
  migrationsTableName: 'migrations_table',
  migrations: ['./migrations/*.{js,ts}'],
};

export const AppDataSource = new DataSource(databaseConfig);
