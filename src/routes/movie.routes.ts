import * as express from 'express';

import { authentification } from '../middlewares/authentification.middleware';

import { MovieController } from '../controllers/movie.controller';

const Router = express.Router();

Router.get('/movies', authentification, MovieController.getMovies);
Router.post('/movies', authentification, MovieController.createMovie);

export = Router;
