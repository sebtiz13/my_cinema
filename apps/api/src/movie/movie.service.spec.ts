import { Test, TestingModule } from '@nestjs/testing';
import { MongoRepository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie as MovieInterface } from '../types/movie.types';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';

const movieData: MovieInterface = {
  id: 354912,
  title: 'Coco',
  overview: 'Lorem ipsum',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 8.2,
  rating: 0,
};

describe('MovieService', () => {
  let service: MovieService;
  const movieRepository = {
    save: jest.fn(),
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

    movieRepository.find.mockClear();
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
    expect(functionCall[0]).toMatchObject(movieData);
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
});
