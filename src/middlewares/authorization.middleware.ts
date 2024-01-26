import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities';

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: req[' currentUser'].id },
    });
    console.log('🚀 authorization ~ user:', user);
    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
