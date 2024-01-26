import * as express from 'express';

import { authentification } from '../middlewares/authentification.middleware';
import { authorization } from '../middlewares/authorization.middleware';
import validationMiddleware from '../middlewares/validation.middleware';

import { UserController } from '../controllers/user.controller';
import { AuthController } from '../controllers/auth.controller';

import { UserRoleEnum } from '../enums';

import { CreateUserDTO } from '../dto/user.dto';

const Router = express.Router();

Router.post(
  '/register',
  validationMiddleware(CreateUserDTO),
  UserController.createUser,
);
Router.post('/login', AuthController.login);

Router.get(
  '/profile',
  authentification,
  authorization([UserRoleEnum.USER, UserRoleEnum.ADMIN]),
  AuthController.getProfile,
);

Router.get(
  '/users',
  authentification,
  authorization([UserRoleEnum.ADMIN]),
  UserController.getUsers,
);

export = Router;
