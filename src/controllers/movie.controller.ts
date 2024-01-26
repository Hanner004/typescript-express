import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { CreateMovieDTO } from '../dto/movie.dto';

export class MovieController {
  static async createMovie(req: Request, res: Response) {
    const data: CreateMovieDTO = req.body;
    const movieRepository = AppDataSource.getRepository(Movie);
    const newMovie = await movieRepository.save(
      movieRepository.create(data),
    );
    return res.status(200).json(newMovie);
  }

  static async getMovies(req: Request, res: Response) {
    const movieRepository = AppDataSource.getRepository(Movie);
    const movies = await movieRepository.find();
    return res.status(200).json(movies);
  }
}
