import express from 'express';
import { routes } from './routes/index';

import { createConnection } from 'typeorm';
import dbConfig from '../db-config';

createConnection(dbConfig).then(async () => {
    const app = express();
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }));

    routes(app);
    app.listen(3000);
  })
  .catch((error) => {
    console.error('Postgres Connection Failed', error);
  });