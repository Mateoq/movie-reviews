/* eslint-disable @typescript-eslint/indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  movieId: string;

  @ApiProperty()
  @IsNotEmpty()
  rating: number;
}
