import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
// import { payload } from "../dto/user.dto";

dotenv.config();
const { JWT_ACCESS_KEY } = process.env;

export class Encrypt {
  static async encryptpass(password: string) {
    return bcrypt.hashSync(password, 12);
  }
  static comparepassword(hashPassword: string, password: string) {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: any) {
    return jwt.sign(payload, JWT_ACCESS_KEY, { expiresIn: '1d' });
  }
}
