'use client';
import { forwardRef, useEffect, useState } from 'react';
import type { Movie } from 'shared_types';
import Link from 'next/link';
import { fetchJson } from '../../helpers';
import { Poster } from '../poster';

export interface SearchResultsProps {
  query: string;
}

export const SearchResults = forwardRef<HTMLDivElement, SearchResultsProps>(function SearchResults(
  { query },
  ref,
) {
  const [result, setResult] = useState<Movie[]>([]);
  useEffect(() => {
    fetchJson<Movie[]>(`http://localhost:3001/movie/search?query=${query}`)
      .then((response) => {
        setResult(response);
      })
      .catch(console.error);
  }, [query]);

  return (
    <div
      className="absolute left-[-40px] right-[-40px] bg-slate-950 p-2 z-50 shadow-md shadow-sky-800 max-h-[90vh] overflow-y-auto"
      ref={ref}
    >
      <ul className="flex flex-col space-y-4">
        {result.map((movie) => (
          <li key={movie.id}>
            <Link className="flex" href={`/movie/${movie.id}`}>
              <Poster
                alt={movie.title}
                className="shrink-0"
                poster={movie.poster_path}
                width={92}
              />
              <div className="ml-2">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                {movie.user_movie ? (
                  <span className="bg-green-800 rounded-lg p-0.5">Saved</span>
                ) : null}
                {movie.overview.length > 0 ? <p>{movie.overview.substring(0, 80)}...</p> : null}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});
