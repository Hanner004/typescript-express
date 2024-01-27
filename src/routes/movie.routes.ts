import * as express from 'express';

import validationMiddleware from '../middlewares/validation.middleware';
import { authentication } from '../middlewares/authentication.middleware';
import { authorization } from '../middlewares/authorization.middleware';
import { MovieController } from '../controllers/movie.controller';

import { RoleEnum } from '../enums';

import {
  CreateMovieDTO,
  UpdateMovieDTO,
  DeleteMovieDTO,
} from '../dto/movie.dto';

const Router = express.Router();

Router.post(
  '/movies',
  validationMiddleware(CreateMovieDTO),
  authentication,
  authorization([RoleEnum.USER, RoleEnum.ADMIN]),
  MovieController.createMovie,
);

Router.get(
  '/movies',
  //   validationMiddleware(DTO),
  authentication,
  authorization([RoleEnum.USER, RoleEnum.ADMIN]),
  MovieController.getMovies,
);

Router.put(
  '/movies',
  validationMiddleware(UpdateMovieDTO),
  authentication,
  authorization([RoleEnum.USER, RoleEnum.ADMIN]),
  MovieController.updateMovie,
);

Router.delete(
  '/movies',
  validationMiddleware(DeleteMovieDTO),
  authentication,
  authorization([RoleEnum.USER, RoleEnum.ADMIN]),
  MovieController.deleteMovie,
);

export = Router;
