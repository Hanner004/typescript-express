import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { IUser as Payload } from '../interfaces/user.interface';

dotenv.config();
const { JWT_ACCESS_KEY, JWT_REFRESH_KEY } = process.env;

export class Encrypt {
  static async encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(password: string, hashPassword: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static async generateToken({ id, role }: Payload) {
    const payload = { id, role };
    const [accessToken, refreshToken] = await Promise.all([
      jwt.sign(payload, JWT_ACCESS_KEY, { expiresIn: '1d' }),
      jwt.sign(payload, JWT_REFRESH_KEY, { expiresIn: '7d' }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
