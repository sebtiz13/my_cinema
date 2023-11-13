import { URL } from 'node:url';

const movieData = {
  id: 354912,
  title: 'Coco',
  overview: 'Lorem ipsum',
  release_date: '2017-10-27',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 8.2,
  rating: 0,
  user_movie: false,
};

export const fetchMock = jest.fn().mockImplementation((url: URL) =>
  Promise.resolve({
    status: 200,
    json: () =>
      Promise.resolve(url.pathname === '/3/movie/1' ? movieData : { results: [movieData] }),
  }),
);

export function getUrlParameter(): URL {
  return (fetchMock.mock.lastCall as Parameters<typeof fetch>)[0] as URL;
}
