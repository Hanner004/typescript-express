import * as express from 'express';

import * as authRouter from './auth.routes';
import * as movieRouter from './movie.routes';
import * as userRouter from './user.routes';

const Router = express.Router();

Router.use('/v1', authRouter);
Router.use('/v1', movieRouter);
Router.use('/v1', userRouter);

export default Router;
