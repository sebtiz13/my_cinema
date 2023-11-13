import { Entity, Column, ObjectIdColumn, Index, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
import type { Movie as MovieInterface } from 'shared_types';

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

  @CreateDateColumn({ type: 'date' })
  release_date!: MovieInterface['release_date'];

  @Column()
  poster_path!: MovieInterface['poster_path'];

  @Column()
  backdrop_path!: MovieInterface['backdrop_path'];

  @Column({ type: 'double' })
  vote_average!: MovieInterface['vote_average'];

  @Column({ default: 0 })
  rating: MovieInterface['rating'] = 0;

  @CreateDateColumn({ type: 'date', default: null })
  user_saved: MovieInterface['user_saved'] = null;

  user_movie: MovieInterface['user_movie'] = true;

  constructor(movie?: Partial<Movie>) {
    Object.assign(this, movie);
  }
}
