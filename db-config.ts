import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'admin',
  password: 'admin',
  database: 'admin',
  synchronize: false,
  logging: false,
  entities: ['models/entities/*.ts']
};
export default dbConfig;