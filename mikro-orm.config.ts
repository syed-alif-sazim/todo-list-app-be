import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Task } from './src/task.entity';
import * as dotenv from 'dotenv';
dotenv.config();

const mikroOrmConfig: Options<PostgreSqlDriver> = {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  driver: PostgreSqlDriver,
  debug: process.env.NODE_ENV === 'development',
  entities: [Task]
};

export default mikroOrmConfig;

