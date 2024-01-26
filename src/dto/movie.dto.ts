import { IsNotEmpty, IsString, IsInt, IsPositive } from 'class-validator';

export class CreateMovieDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  director: string;
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  year: number;
}

export class UpdateMovieDTO extends CreateMovieDTO {}
