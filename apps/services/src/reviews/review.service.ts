import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Review from './review.entity';
import Movie from '../movies/movie.entity';
import { CreateReviewDto } from './review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  findAll(): Promise<Review[]> {
    return this.reviewRepo.find();
  }

  findOne(id: string): Promise<Review | null> {
    return this.reviewRepo.findOneBy({ id });
  }

  async create(reviewDto: CreateReviewDto): Promise<Review | null> {
    const review = new Review();
    review.username = reviewDto.username;
    review.rating = reviewDto.rating;

    const movie = await this.movieRepo.findOneBy({ id: reviewDto.movieId });

    review.movie = movie;

    this.reviewRepo.save(review);
    return review;
  }
}
