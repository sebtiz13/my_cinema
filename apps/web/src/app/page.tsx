'use client';
import { useEffect, useState } from 'react';
import type { Movie } from 'shared_types';
import { fetchMovie } from '../helpers';
import { MovieCard, SortFilter } from '@/components';

const sorts = {
  release_date: 'Release date',
  user_saved: 'Saved date',
};

interface Sort extends Record<string, string>{
  sortBy: string;
  sortOrder: string;
}

export default function Home(): JSX.Element {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [sort, setSort] = useState<Sort>();

  useEffect(() => {
    let url = 'http://localhost:3001/movie';
    if(sort !== undefined) {
      url += `?${new URLSearchParams(sort).toString()}`;
    }

    fetchMovie<Movie[]>(url).then(setMovies).catch(console.error);
  }, [sort]);

  const emptyMovies = (
    <div className="text-center">
      <h2 className="text-lg font-semibold">No movies saved</h2>
      <p>To start, search a movie and click on &quot;save&quot; button on movie page</p>
    </div>
  );

  function onSort(sortBy: string, sortOrder: string): void {
    // ? Prevent useless change when SortFilter component is reloaded
    if (sort !== undefined && sort.sortBy === sortBy && sort.sortOrder === sortOrder) {
      return;
    }

    setSort({
      sortBy,
      sortOrder,
    });
  }

  const myMovies = (
    <>
      <div className="flex items-center mb-6 space-x-4">
        <h1 className="text-xl font-bold">My movies</h1>
        <SortFilter onSort={onSort} sorts={sorts} />
      </div>
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
