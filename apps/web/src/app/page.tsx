'use client';
import { useEffect, useState } from 'react';
import type { Movie } from 'shared_types';
import { MovieCard } from '../components/movie-card';
import { fetchJson } from '../helpers';

export default function Home(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    fetchJson<Movie[]>('http://localhost:3001/movie').then(setMovies).catch(console.error);
  }, []);

  const emptyMovies = (
    <div className="text-center">
      <h2 className="text-lg font-semibold">No movies saved</h2>
      <p>To start, search a movie and click on &quot;save&quot; button on movie page</p>
    </div>
  );

  const myMovies = (
    <>
      <h1 className="text-xl font-bold mb-6">My movies</h1>
      <div className="grid grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );

  return (
    <main className="container mx-auto mt-8 mb-8">
      {movies.length > 0 ? myMovies : emptyMovies}
    </main>
  );
}
