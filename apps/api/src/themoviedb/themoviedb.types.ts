import type { Movie } from 'shared_types';

export interface ApiMovie extends Omit<Movie, 'release_date'> {
  release_date: string;
  [key: string]: unknown;
};

export interface ApiMovieSearch {
  page: number;
  results: ApiMovie[];
  total_pages: number;
  total_results: number;
}
