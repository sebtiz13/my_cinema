'use client';
import { useEffect, useState } from 'react';
import type { Movie } from 'shared_types';
import { fetchJson, getImageUrl } from '../../../helpers';
import { Poster } from '../../../components/poster';
import { SavedButton } from '../../../components/save-button';

interface MovieProps {
  params: {
    id: number;
  };
}

export default function Movie({ params: { id } }: MovieProps): JSX.Element | null {
  const [movie, setMovie] = useState<Movie>();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchJson<Movie>(`http://localhost:3001/movie/${id}`)
      .then((response) => {
        setMovie(response);
        setSaved(response.user_movie);
      })
      .catch(console.error);
  }, [id]);

  if (movie === undefined) {
    return null;
  }

  const backdropMovie =
    movie.backdrop_path !== null
      ? `url(${getImageUrl('backdrop', movie.backdrop_path, 1280)})`
      : undefined;
  const popularityPercent = movie.vote_average * 10;

  const onClickSave = async (): Promise<void> => {
    if (saved) {
      await fetch(`http://localhost:3001/movie/${id}`, { method: 'DELETE' });
    } else {
      await fetch(`http://localhost:3001/movie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
    }
    setSaved(!saved);
  };

  return (
    <main className="flex flex-col">
      <header className="bg-cover h-[600px]" style={{ backgroundImage: backdropMovie }}>
        <div className="flex flex-col justify-center h-full py-4 backdrop-blur bg-opacity-50 bg-sky-900">
          <div className="container mx-auto flex">
            <Poster alt={movie.title} poster={movie.poster_path} width={185} />
            <div className="flex flex-col space-y-4 p-4">
              <section className="flex">
                <h1 className="text-4xl font-semibold">{movie.title}</h1>
                <div className="ml-2 flex items-center">
                  <SavedButton className="h-8" onClick={onClickSave} saved={saved} />
                </div>
              </section>
              <section>
                <h2 className="text-xl font-semibold">Popularity</h2>
                <div className="relative h-6 w-40">
                  <progress className="h-6" max="100" value={popularityPercent} />
                  <div className="absolute inset-0 text-center">{`${popularityPercent}%`}</div>
                </div>
              </section>
              {movie.overview.length > 0 && (
                <section className="mt-4">
                  <h2 className="text-xl font-semibold">Overview</h2>
                  <p>{movie.overview}</p>
                </section>
              )}
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
