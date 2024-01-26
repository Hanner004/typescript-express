import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Encrypt } from '../helpers/encrypt.helper';
import { User } from '../entities/user.entity';
import { LoginDTO } from '../dto/auth.dto';

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password }: LoginDTO = req.body;
      const userRepository = AppDataSource.getRepository(User);
      const userFound = await userRepository.findOne({
        where: { email },
        select: ['id', 'password', 'role'],
      });

      if (
        !userFound ||
        Encrypt.comparePassword(password, userFound.password) === false
      ) {
        return res
          .status(404)
          .json({ message: 'e-mail or password invalid' });
      }

      const { accessToken, refreshToken } =
        await Encrypt.generateToken(userFound);

      delete userFound.password;

      return res.status(200).json({
        message: 'Login successful',
        accessToken,
        refreshToken,
        data: userFound,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  static async getProfile(req: Request, res: Response) {
    if (!req[' currentUser']) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userRepository = AppDataSource.getRepository(User);
    const userFound = await userRepository.findOne({
      where: { id: req[' currentUser'].id },
    });
    return res.status(200).json({ ...userFound, password: undefined });
  }
}
