import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import type { Movie } from 'shared_types';
import { ThemoviedbService } from '../themoviedb/themoviedb.service';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly theMovieDbService: ThemoviedbService,
  ) {}

  @Post()
  async create(@Body() movie: Omit<Movie, 'user_movie'>): Promise<Movie> {
    try {
      return await this.movieService.create(movie);
    } catch (error) {
      throw new BadRequestException((error as Error).message);
    }
  }

  @Get()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get('search')
  async search(@Query('query') query: string): Promise<Movie[]> {
    const result = await this.movieService.search(query);
    const apiMovies = await this.theMovieDbService.search(query);

    for (const movie of apiMovies) {
      if (result.find((r) => r.id === movie.id)) {
        continue;
      }
      result.push(movie);
    }

    return result;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Movie | null> {
    const storedMovie = await this.movieService.findOne(id);

    if (storedMovie !== null) {
      return storedMovie;
    }

    return this.theMovieDbService.getMovie(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.movieService.remove(id);
  }

  @Get(':id/rate/:rating')
  async rateMovie(
    @Param('id', ParseIntPipe) id: number,
    @Param('rating', ParseIntPipe) rating: Movie['rating'],
  ): Promise<Movie> {
    if (rating < 0 || rating > 5) {
      throw new BadRequestException('rate value should be between 0 and 5');
    }

    return this.movieService.rateMovie(id, rating);
  }

  @Get(':id/similar')
  async similarMovie(@Param('id', ParseIntPipe) id: number): Promise<Movie[]> {
    return this.theMovieDbService.similarMovie(id);
  }
}
