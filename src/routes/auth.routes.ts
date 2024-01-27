import * as express from 'express';

import validationMiddleware from '../middlewares/validation.middleware';
import { authentication } from '../middlewares/authentication.middleware';
import { authorization } from '../middlewares/authorization.middleware';
import { AuthController } from '../controllers/auth.controller';

import { RoleEnum } from '../enums';

import { LoginDTO } from '../dto/auth.dto';

const Router = express.Router();

Router.post(
  '/auth/login',
  validationMiddleware(LoginDTO),
  //   authentication,
  //   authorization([RoleEnum.USER, RoleEnum.ADMIN]),
  AuthController.login,
);

Router.get(
  '/auth/profile',
  //   validationMiddleware(DTO),
  authentication,
  authorization([RoleEnum.USER, RoleEnum.ADMIN]),
  AuthController.getProfile,
);

export = Router;
