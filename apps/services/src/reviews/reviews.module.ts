import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReviewsController } from './reviews.controller';
import { ReviewService } from './review.service';
import Review from './review.entity';

import Movie from 'src/movies/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Movie])],
  controllers: [ReviewsController],
  providers: [ReviewService],
})
export class ReviewsModule {}
