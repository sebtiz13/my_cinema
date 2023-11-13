import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Movie } from 'shared_types';
import { ApiMovieSearch, ApiMovie } from './themoviedb.types';

interface SearchQuery {
  controller: 'search';
  action: 'movie';
  query: string;
}

interface MovieQuery {
  controller: 'movie';
  id: number;
  action?: 'similar';
}

type ApiQuery = SearchQuery | MovieQuery;

function extractMovie(movie: ApiMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    release_date: new Date(movie.release_date),
    poster_path: movie.poster_path,
    backdrop_path: movie.backdrop_path,
    vote_average: movie.vote_average,
    rating: 0,
    user_saved: null,
    user_movie: false,
  };
}

@Injectable()
export class ThemoviedbService {
  constructor(private readonly configService: ConfigService) {}

  private getRequestPath(query: ApiQuery): string {
    const path: (string | number | undefined)[] = [query.controller];

    if (query.controller === 'movie') {
      path.push(query.id, query.action);
    }

    if (query.controller === 'search') {
      path.push(query.action);
    }

    return path.filter(Boolean).join('/');
  }

  private async request<T = unknown>(query: ApiQuery, params?: URLSearchParams): Promise<T> {
    const searchParams = new URLSearchParams(params);
    searchParams.set('api_key', this.configService.getOrThrow<string>('THEMOVIEDB_APIKEY'));

    if (query.controller === 'search') {
      searchParams.set('query', query.query);
    }

    const url = new URL(
      `${this.getRequestPath(query)}?${searchParams.toString()}`,
      'https://api.themoviedb.org/3/',
    );

    const request = await fetch(url);

    if (request.status === 404) {
      throw new NotFoundException();
    }

    if (request.status !== 200) {
      const error = (await request.json()) as {
        status_message?: string;
      };

      throw new BadGatewayException(error.status_message ?? 'Error with the movie db API');
    }

    return request.json() as Promise<T>;
  }

  async getMovie(id: number): Promise<Movie> {
    return extractMovie(await this.request<ApiMovie>({ controller: 'movie', id }));
  }

  async search(query: string): Promise<Movie[]> {
    const resultMovie = await this.request<ApiMovieSearch>({
      controller: 'search',
      action: 'movie',
      query,
    });

    return resultMovie.results.map(extractMovie);
  }

  async similarMovie(id: number): Promise<Movie[]> {
    const resultMovie = await this.request<ApiMovieSearch>({
      controller: 'movie',
      action: 'similar',
      id,
    });

    return resultMovie.results.map(extractMovie);
  }
}
