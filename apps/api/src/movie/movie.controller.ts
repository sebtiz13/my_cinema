import { Controller, Get, Post, Body, Param, Delete, Query, ParseIntPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Movie } from '../types/movie.types';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async create(@Body() movie: Movie): Promise<Movie> {
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
    return this.movieService.search(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Movie | null> {
    const movie = await this.movieService.findOne(id);
    if (movie === null) {
      throw new NotFoundException();
    }
    return movie;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.movieService.remove(id);
  }
}
