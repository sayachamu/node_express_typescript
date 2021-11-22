import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5431,
  username: 'admin',
  password: 'admin',
  database: 'admin',
  synchronize: true,
  logging: false,
  entities: ['entities/*.ts']
};
export default dbConfig;