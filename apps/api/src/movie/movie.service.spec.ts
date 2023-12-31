import { Test, TestingModule } from '@nestjs/testing';
import { MongoRepository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostMovie } from 'shared_types';
import { clearMock } from '../../test/helpers';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';

const movieData: PostMovie = {
  id: 354912,
  title: 'Coco',
  overview: 'Lorem ipsum',
  release_date: '2023-11-13',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 8.2,
  rating: 0,
};

describe('MovieService', () => {
  let service: MovieService;
  const movieRepository = {
    save: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const movieRepositoryToken = getRepositoryToken(Movie);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: movieRepositoryToken,
          useClass: MongoRepository,
        },
      ],
    })
      .overrideProvider(movieRepositoryToken)
      .useValue(movieRepository)
      .compile();

    service = module.get<MovieService>(MovieService);

    clearMock(movieRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can create movie', async () => {
    await service.create(movieData);

    const functionCall = movieRepository.save.mock.lastCall as Parameters<
      MongoRepository<Movie>['save']
    >;

    expect(movieRepository.save.mock.calls).toHaveLength(1);
    expect(functionCall[0]).toMatchObject({
      ...movieData,
      release_date: new Date(movieData.release_date),
    });
    expect(functionCall[0].user_saved).toBeInstanceOf(Date);
    expect((functionCall[0].user_saved as Date).getTime()).not.toBeNaN();
  });

  it('can search movie', async () => {
    await service.search('coco');

    expect(movieRepository.find.mock.calls).toHaveLength(1);
  });

  it('can list movie', async () => {
    await service.findAll();

    expect(movieRepository.find.mock.calls).toHaveLength(1);
  });

  it('can find a movie', async () => {
    await service.findOne(1);

    const functionCall = movieRepository.findOneBy.mock.lastCall as Parameters<
      MongoRepository<Movie>['findOneBy']
    >;

    expect(movieRepository.findOneBy.mock.calls).toHaveLength(1);
    expect(functionCall[0]).toMatchObject({
      id: 1,
    });
  });

  it('can delete a movie', async () => {
    await service.remove(1);

    const functionCall = movieRepository.delete.mock.lastCall as Parameters<
      MongoRepository<Movie>['delete']
    >;

    expect(movieRepository.delete.mock.calls).toHaveLength(1);
    expect(functionCall[0]).toMatchObject({
      id: 1,
    });
  });

  it('can rate a movie', async () => {
    movieRepository.findOneBy.mockResolvedValueOnce(movieData);

    await service.rateMovie(1, 5);

    const functionCall = movieRepository.update.mock.lastCall as Parameters<
      MongoRepository<Movie>['update']
    >;

    expect(movieRepository.update.mock.calls).toHaveLength(1);
    expect(functionCall[0]).toMatchObject({
      id: 1,
    });
    expect(functionCall[1]).toMatchObject({
      rating: 5,
    });
  });
});
