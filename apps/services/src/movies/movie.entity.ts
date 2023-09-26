/* eslint-disable @typescript-eslint/indent */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Review from '../reviews/review.entity';

@Entity()
class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  image: string;

  @Column({ type: 'int', name: 'tmdb_id' })
  tmdbId: number;

  @OneToMany(() => Review, (review) => review.movie)
  reviews: Review[];
}

export default Movie;
