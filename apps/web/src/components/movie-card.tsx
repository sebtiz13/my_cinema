import Link from 'next/link';
import type { Movie } from 'shared_types';
import { Poster } from './poster';

interface MovieCardProps {
  movie: Movie;
}
export function MovieCard({ movie }: MovieCardProps): JSX.Element {
  return (
    <article className="flex justify-center">
      <Link
        className="relative transition-transform duration-500 group hover:scale-110 hover:z-10"
        href={`/movie/${movie.id}`}
      >
        <Poster alt={movie.title} className="shrink-0" poster={movie.poster_path} width={342} />
        <div className="absolute inset-x-0 bottom-0 p-2 bg-slate-900/80">
          <h3 className="text-lg font-bold">{movie.title}</h3>
          <p className="mt-2 hidden group-hover:block">{movie.overview}</p>
        </div>
      </Link>
    </article>
  );
}
