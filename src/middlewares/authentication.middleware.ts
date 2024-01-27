import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const { JWT_ACCESS_KEY } = process.env;

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;
    if (!header) throw new Error('Authorization header missing');
    const token = header.split(' ')[1];
    if (!token) throw new Error('Token missing');
    const decode = jwt.verify(token, JWT_ACCESS_KEY);
    req[' currentUser'] = decode;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
};
