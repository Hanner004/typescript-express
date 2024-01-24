import * as express from 'express';
import validationMiddleware from '../middlewares/validation.middleware';
import { CreateClientDTO } from '../dto/client.dto';
import { ClientController } from '../controllers/client.controller';

const Router = express.Router();

Router.post(
  '/clients',
  validationMiddleware(CreateClientDTO),
  ClientController.createClient,
);

Router.get('/clients', ClientController.getClients);

export { Router as clientRouter };
