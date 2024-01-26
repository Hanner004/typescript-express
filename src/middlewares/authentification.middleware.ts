import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const { JWT_ACCESS_KEY } = process.env;

export const authentification = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const decode = jwt.verify(token, JWT_ACCESS_KEY);
  if (!decode) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  console.log('🚀 authentification ~ decode:', decode);
  req[' currentUser'] = decode;
  next();
};
