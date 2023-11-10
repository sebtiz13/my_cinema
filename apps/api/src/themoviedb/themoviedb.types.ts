import { Movie } from '../types/movie.types';

export type ApiMovie = Movie & Record<string, unknown>;

export interface ApiMovieSearch {
  page: number;
  results: ApiMovie[];
  total_pages: number;
  total_results: number;
}
