import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { fetchMock, getUrlParameter } from '../../test/helpers/fetch-mock';
import { ThemoviedbService } from './themoviedb.service';

global.fetch = fetchMock;

describe('ThemoviedbService', () => {
  let service: ThemoviedbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env', '.env.local'],
        }),
      ],
      providers: [ThemoviedbService],
    }).compile();

    service = module.get<ThemoviedbService>(ThemoviedbService);
    fetchMock.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can get a movie', async () => {
    const movie = await service.getMovie(1);

    expect(movie).toMatchObject({
      id: 354912,
      title: 'Coco',
      overview: 'Lorem ipsum',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      vote_average: 8.2,
      rating: 0,
      user_movie: false,
    });

    const { pathname, searchParams } = getUrlParameter();

    expect(fetchMock.mock.calls).toHaveLength(1);
    expect(pathname).toBe('/3/movie/1');
    expect(typeof searchParams.get('api_key')).toBe('string');
  });

  it('can get movies recommendations', async () => {
    const movie = await service.similarMovie(1);

    expect(movie[0]).toMatchObject({
      id: 354912,
      title: 'Coco',
      overview: 'Lorem ipsum',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      vote_average: 8.2,
      rating: 0,
      user_movie: false,
    });

    const { pathname, searchParams } = getUrlParameter();

    expect(fetchMock.mock.calls).toHaveLength(1);
    expect(pathname).toBe('/3/movie/1/similar');
    expect(typeof searchParams.get('api_key')).toBe('string');
  });

  it('can search movies', async () => {
    const movie = await service.search('test');

    expect(movie[0]).toMatchObject({
      id: 354912,
      title: 'Coco',
      overview: 'Lorem ipsum',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      vote_average: 8.2,
      rating: 0,
      user_movie: false,
    });

    const { pathname, searchParams } = getUrlParameter();

    expect(fetchMock.mock.calls).toHaveLength(1);
    expect(pathname).toBe('/3/search/movie');
    expect(typeof searchParams.get('api_key')).toBe('string');
    expect(searchParams.get('query')).toBe('test');
  });
});
