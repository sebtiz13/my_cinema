import { Test, TestingModule } from '@nestjs/testing';
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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieService],
      controllers: [MovieController],
    })
      .overrideProvider(MovieService)
      .useValue(movieService)
      .compile();

    controller = module.get<MovieController>(MovieController);
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

    const functionCall = movieService.findOne.mock.lastCall as Parameters<
      MovieController['findOne']
    >;

    expect(movieService.findOne.mock.calls).toHaveLength(1);
    expect(functionCall[0]).toBe(1);
  });

  it('can delete a movie', async () => {
    await controller.remove(1);

    const functionCall = movieService.remove.mock.lastCall as Parameters<MovieController['remove']>;

    expect(movieService.remove.mock.calls).toHaveLength(1);
    expect(functionCall[0]).toBe(1);
  });
});
