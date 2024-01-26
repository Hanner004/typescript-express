import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  IsLowercase,
  IsEnum,
} from 'class-validator';
import { UserRoleEnum } from '../enums';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  @IsEnum(UserRoleEnum)
  @IsNotEmpty()
  role: UserRoleEnum;
}

export class UpdateUserDTO extends CreateUserDTO {}
