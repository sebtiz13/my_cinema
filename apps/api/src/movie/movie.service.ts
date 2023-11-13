import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Movie as MovieInterface } from 'shared_types';
import { DeleteResult, MongoRepository } from 'typeorm';
import type { FindOptionsOrder } from 'typeorm';
import { Movie } from './entities/movie.entity';

type SortOrder = 'ASC' | 'DESC' | 'asc' | 'desc';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: MongoRepository<Movie>,
  ) {}

  get validSortKeys() {
    return ['title', 'vote_average', 'rating'];
  }

  get validSortOrder() {
    return ['ASC', 'DESC', 'asc', 'desc'];
  }

  isValidSortKey(key: string): key is keyof MovieInterface {
    return this.validSortKeys.includes(key);
  }

  isValidSortOrder(order: string): order is SortOrder {
    return this.validSortOrder.includes(order);
  }

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

  async findAll(sortBy?: keyof MovieInterface, sortOrder?: SortOrder): Promise<MovieInterface[]> {
    const order: FindOptionsOrder<Movie> = {};

    if (sortBy !== undefined) {
      order[sortBy] = sortOrder ?? 'ASC';
    }

    return this.movieRepository.find({ order });
  }

  async findOne(id: number): Promise<MovieInterface | null> {
    return this.movieRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.movieRepository.delete({ id });
  }

  async rateMovie(id: number, rate: MovieInterface['rating']): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy({ id });

    if (movie === null) {
      throw new NotFoundException();
    }

    movie.rating = rate;
    await this.movieRepository.update({ id }, { rating: rate });

    return movie;
  }
}
