import { Entity, Column, ObjectIdColumn, Index } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Movie as MovieInterface } from '../../types/movie.types';

@Entity()
export class Movie implements MovieInterface {
  @ObjectIdColumn()
  _id!: ObjectId;

  @Column()
  @Index({ unique: true })
  id!: MovieInterface['id'];

  @Column()
  title!: MovieInterface['title'];

  @Column()
  overview!: MovieInterface['overview'];

  @Column()
  poster_path!: MovieInterface['poster_path'];

  @Column()
  backdrop_path!: MovieInterface['backdrop_path'];

  @Column({ type: 'double' })
  vote_average!: MovieInterface['vote_average'];

  @Column({ default: 0 })
  rating: MovieInterface['rating'] = 0;

  constructor(movie?: Partial<Movie>) {
    Object.assign(this, movie);
  }
}
