import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, MongoRepository } from 'typeorm';
import { Movie as MovieInterface } from '../types/movie.types';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: MongoRepository<Movie>,
  ) {}

  async create(movie: Omit<MovieInterface, 'user_movie'>): Promise<MovieInterface> {
    return this.movieRepository.save(movie);
  }

  async search(query: string): Promise<MovieInterface[]> {
    return this.movieRepository.find({
      where: {
        $or: [
          {
            title: new RegExp(`${query}`, 'i'),
          },
          {
            overview: new RegExp(`${query}`, 'i'),
          },
        ],
      },
    });
  }

  async findAll(): Promise<MovieInterface[]> {
    return this.movieRepository.find();
  }

  async findOne(id: number): Promise<MovieInterface | null> {
    return this.movieRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.movieRepository.delete({ id });
  }
}
