import { AppDataSource } from './data-source';
import * as express from 'express';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';

import { errorHandler } from './middlewares/errorHandler.middleware';

import IndexRouter from './routes/index.routes';

import 'reflect-metadata';
dotenv.config();

const { HTTP_SERVER_PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(errorHandler);

app.use('/api', IndexRouter);

app.get('*', (req: Request, res: Response) => {
  return res.status(505).json({ message: 'HTTP Version Not Supported' });
});

AppDataSource.initialize()
  .then(async () => {
    app.listen(HTTP_SERVER_PORT, () => {
      console.log(
        'Server is running on http://localhost:' + HTTP_SERVER_PORT,
      );
    });
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));
