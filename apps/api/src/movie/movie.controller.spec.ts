import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ThemoviedbService } from '../themoviedb/themoviedb.service';
import { clearMock } from '../../test/helpers';
import { Movie } from '../types/movie.types';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('MovieController', () => {
  let controller: MovieController;
  const movieService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    rateMovie: jest.fn(),
  };
  const themoviedbService = {
    getMovie: jest.fn(),
    search: jest.fn(),
    similarMovie: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env', '.env.local'],
        }),
      ],
      providers: [MovieService, ThemoviedbService],
      controllers: [MovieController],
    })
      .overrideProvider(MovieService)
      .useValue(movieService)
      .overrideProvider(ThemoviedbService)
      .useValue(themoviedbService)
      .compile();

    controller = module.get<MovieController>(MovieController);

    clearMock(movieService);
    clearMock(themoviedbService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('can create movie', async () => {
    const movie: Omit<Movie, 'user_movie'> = {
      id: 354912,
      title: 'Coco',
      overview: 'Lorem ipsum',
      poster_path: '/poster.jpg',
      backdrop_path: '/backdrop.jpg',
      vote_average: 8.2,
      rating: 0,
    };
    await controller.create(movie);

    const functionCall = (movieService.create.mock.lastCall as [Omit<Movie, 'user_movie'>])[0];

    expect(movieService.create.mock.calls).toHaveLength(1);
    expect(functionCall).toMatchObject(movie);
  });

  it('can list movies', async () => {
    await controller.findAll();

    expect(movieService.findAll.mock.calls).toHaveLength(1);
  });

  it('can find a movie', async () => {
    await controller.findOne(1);

    const findOneParameters = movieService.findOne.mock.lastCall as Parameters<
      MovieController['findOne']
    >;

    expect(movieService.findOne.mock.calls).toHaveLength(1);
    expect(findOneParameters[0]).toBe(1);

    // Tests call to themoviedb service when the movie is not saved by user
    movieService.findOne.mockResolvedValueOnce(null);

    await controller.findOne(1);
    const getMovieParameters = themoviedbService.getMovie.mock.lastCall as Parameters<
      ThemoviedbService['getMovie']
    >;

    expect(themoviedbService.getMovie.mock.calls).toHaveLength(1);
    expect(getMovieParameters[0]).toBe(1);
  });

  it('can delete a movie', async () => {
    await controller.remove(1);

    const functionCall = movieService.remove.mock.lastCall as Parameters<MovieController['remove']>;

    expect(movieService.remove.mock.calls).toHaveLength(1);
    expect(functionCall[0]).toBe(1);
  });

  it('can rate a movie', async () => {
    await controller.rateMovie(1, 5);

    const functionCall = movieService.rateMovie.mock.lastCall as Parameters<
      MovieController['rateMovie']
    >;

    expect(movieService.rateMovie.mock.calls).toHaveLength(1);
    expect(functionCall[0]).toBe(1);
    expect(functionCall[1]).toBe(5);
  });
});
