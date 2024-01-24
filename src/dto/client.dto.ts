import { IsNotEmpty, IsString, IsEmail, IsLowercase } from 'class-validator';

export class CreateClientDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsEmail()
  @IsNotEmpty()
  @IsLowercase()
  email: string;
}

export class UpdateClientDTO extends CreateClientDTO {}

export class ClientResponse {
  id: number;
  name: string;
  lastname: string;
  email: string;
}
