import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Encrypt } from '../helpers/encrypt.helper';
import { User } from '../entities';
import {
  RegisterUserDTO,
  UpdateUserDTO,
  DeleteUserDTO,
} from '../dto/user.dto';

export class UserController {
  static async registerUser(req: Request, res: Response) {
    const { password, ...data }: RegisterUserDTO = req.body;

    const userRepository = AppDataSource.getRepository(User);

    const userEmailFound = await userRepository.findOne({
      where: { email: data.email },
    });
    if (userEmailFound)
      return res.status(409).json({ message: 'email already exists' });

    const encryptedPassword = await Encrypt.encryptPassword(password);
    const newUser = await userRepository.save(
      userRepository.create({
        password: encryptedPassword,
        ...data,
      }),
    );

    delete newUser.password;

    const { accessToken, refreshToken } =
      await Encrypt.generateToken(newUser);

    return res.status(200).json({
      message: 'User created successfully',
      accessToken,
      refreshToken,
      data: newUser,
    });
  }

  static async getUsers(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find({
      order: { created_at: 'DESC' },
    });
    return res.status(200).json(users);
  }

  static async updateUser(req: Request, res: Response) {
    const { id, ...data }: UpdateUserDTO = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({ where: { id } });
    if (!userFound)
      return res.status(404).json({ message: 'User not found' });

    await userRepository.update(id, data);
    return res.status(200).json({ message: 'User updated successfully' });
  }

  static async deleteUser(req: Request, res: Response) {
    const { id }: DeleteUserDTO = req.body;
    const userRepository = AppDataSource.getRepository(User);

    const userFound = await userRepository.findOne({ where: { id } });
    if (!userFound)
      return res.status(404).json({ message: 'User not found' });

    await userRepository.softDelete(id);
    return res.status(200).json({ message: 'User deleted successfully' });
  }
}
