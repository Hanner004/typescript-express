import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsPositive,
  IsUUID,
} from 'class-validator';

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

export class UpdateMovieDTO extends CreateMovieDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class DeleteMovieDTO {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
