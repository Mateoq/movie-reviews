/* eslint-disable @typescript-eslint/indent */
import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import Movie from '../movies/movie.entity';

@Entity()
class Review {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text')
  username: string;

  @ApiProperty()
  @Column('int')
  rating: number;

  @ApiProperty()
  @ManyToOne(() => Movie, (movie) => movie.reviews)
  movie: Movie;
}

export default Review;
