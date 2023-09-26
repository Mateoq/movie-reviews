import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Movie from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.movieRepo.find({ relations: ['reviews'] });
  }

  findOne(id: string): Promise<Movie | null> {
    return this.movieRepo.findOne({ where: { id }, relations: ['reviews'] });
  }
}
