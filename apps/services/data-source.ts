import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config';

import Movie from './src/movies/movie.entity';
import Review from './src/reviews/review.entity';

export async function createDataSource(): Promise<DataSource|null> {
  const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;
  const pgPort = parseInt(PGPORT ?? '', 10);
  let result: DataSource | null = null;

  const dataSource = new DataSource({
    type: 'postgres',
    host: PGHOST,
    port: pgPort,
    username: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    entities: [Movie, Review],
    synchronize: true,
    logging: false,
  });

  try {
    await dataSource.initialize();
    result = dataSource;
  } catch (err) {
    console.error(err);
  }

  return result;
}
