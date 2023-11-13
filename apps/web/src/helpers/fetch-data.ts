import type { Movie } from "shared_types";

function parseMovie<T extends Movie>(movie: T): T {
  return {
    ...movie,
    release_date: new Date(movie.release_date as unknown as string),
    user_saved: movie.user_saved !== null ? new Date(movie.user_saved as unknown as string) : null,
  };
}

export async function fetchJson<T extends object = Record<string, unknown>>(
  url: string,
): Promise<T> {
  const response = await fetch(url);
  return response.json() as T;
}

export async function fetchMovie<T extends Movie | Movie[]>(url: string): Promise<T> {
  const result = await fetchJson<T>(url);

  if (!Array.isArray(result)) {
    return parseMovie(result) as T;
  }
  return result.map(parseMovie) as T;
}
