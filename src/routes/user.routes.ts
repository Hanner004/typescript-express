import * as express from 'express';

import validationMiddleware from '../middlewares/validation.middleware';
import { authentication } from '../middlewares/authentication.middleware';
import { authorization } from '../middlewares/authorization.middleware';
import { UserController } from '../controllers/user.controller';

import { RoleEnum } from '../enums';

import {
  RegisterUserDTO,
  UpdateUserDTO,
  DeleteUserDTO,
} from '../dto/user.dto';

const Router = express.Router();

Router.post(
  '/users/register',
  validationMiddleware(RegisterUserDTO),
  //   authentication,
  //   authorization([RoleEnum.USER, RoleEnum.ADMIN]),
  UserController.registerUser,
);

Router.get(
  '/users',
  //   validationMiddleware(DTO),
  authentication,
  authorization([RoleEnum.ADMIN]),
  UserController.getUsers,
);

Router.put(
  '/users',
  validationMiddleware(UpdateUserDTO),
  authentication,
  authorization([RoleEnum.ADMIN]),
  UserController.updateUser,
);

Router.delete(
  '/users',
  validationMiddleware(DeleteUserDTO),
  authentication,
  authorization([RoleEnum.ADMIN]),
  UserController.deleteUser,
);

export = Router;
