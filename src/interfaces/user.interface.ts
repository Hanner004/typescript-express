import { RoleEnum } from '../enums';

export interface IUser {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password?: string | null;
  role: RoleEnum;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
