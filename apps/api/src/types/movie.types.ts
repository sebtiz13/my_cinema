export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  rating: 0 | 1 | 2 | 3 | 4 | 5;
}
