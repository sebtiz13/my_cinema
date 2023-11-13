export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: Date;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
  user_saved: Date | null;
  user_movie: boolean;
}

export interface PostMovie extends Omit<Movie, 'user_movie' | 'user_saved' | 'release_date'> {
  release_date: string;
}
