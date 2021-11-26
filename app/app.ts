import express, { Request, Response, NextFunction  } from 'express';
import { getRepository } from 'typeorm'
import { savePoker } from './routes/index';

import { createConnection } from 'typeorm';
import dbConfig from '../db-config';

createConnection(dbConfig).then(async (connection) => {
  const app = express();
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));

  app.post('/', savePoker);
  app.listen(3000);
})
.catch((error) => {
  console.error('Postgres Connection Failed', error);
});