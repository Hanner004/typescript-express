import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import {
  CreateMovieDTO,
  UpdateMovieDTO,
  DeleteMovieDTO,
} from '../dto/movie.dto';

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
    const movies = await movieRepository.find({
      order: { created_at: 'DESC' },
    });
    return res.status(200).json(movies);
  }

  static async updateMovie(req: Request, res: Response) {
    const { id, ...data }: UpdateMovieDTO = req.body;
    const movieRepository = AppDataSource.getRepository(Movie);

    const movieFound = await movieRepository.findOne({ where: { id } });
    if (!movieFound)
      return res.status(404).json({ message: 'Movie not found' });

    await movieRepository.update(id, data);
    return res
      .status(200)
      .json({ message: 'Movie updated successfully' });
  }

  static async deleteMovie(req: Request, res: Response) {
    const { id }: DeleteMovieDTO = req.body;
    const movieRepository = AppDataSource.getRepository(Movie);

    const movieFound = await movieRepository.findOne({ where: { id } });
    if (!movieFound)
      return res.status(404).json({ message: 'Movie not found' });

    await movieRepository.softDelete(id);
    return res
      .status(200)
      .json({ message: 'Movie deleted successfully' });
  }
}
