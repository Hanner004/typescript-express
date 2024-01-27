import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities';

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User);
    const userFound = await userRepository.findOne({
      where: { id: req[' currentUser'].id },
    });

    if (!userFound)
      return res.status(401).json({ message: 'Non-authenticated user' });
    if (!roles.includes(userFound.role))
      return res.status(403).json({ message: 'Forbidden' });

    next();
  };
};
