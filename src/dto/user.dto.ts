import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  IsLowercase,
  IsEnum,
} from 'class-validator';
import { RoleEnum } from '../enums';

export class RegisterUserDTO {
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
  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: RoleEnum;
}

export class UpdateUserDTO extends RegisterUserDTO {}
