import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @IsLowercase()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
