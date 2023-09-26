import axios from 'axios';
import { createDataSource } from '../data-source';

import Movie from '../src/movies/movie.entity';

const MOVIE_MAX_PAGES = 4;

interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string;
}

interface TMDBRes {
  page: number;
  results: TMDBMovie[];
}

async function main() {
  console.log('[Seeding]');
  const { TMDB_API_TOKEN, TMDB_API_URL } = process.env;
  console.log(TMDB_API_TOKEN, TMDB_API_URL);

  const dataSource = await createDataSource();
  const moviesRepository = dataSource.getRepository(Movie);

  for (let i = 0; i < MOVIE_MAX_PAGES; i++) {
    const url = `${TMDB_API_URL}?language=en-US&page=${i + 1}`;
    const movies = await axios
      .get<TMDBRes>(url, {
        headers: {
          Authorization: `Bearer ${TMDB_API_TOKEN}`,
        },
      })
      .then((res) => res.data);

    for (const movieData of movies.results) {
      const foundMovie = await moviesRepository.findOneBy({
        tmdbId: movieData.id,
      });

      if (foundMovie) {
        continue;
      }

      console.log('-> Movie:', movieData.title);

      const movie = new Movie();
      movie.tmdbId = movieData.id;
      movie.title = movieData.title;
      movie.image = movieData.poster_path;
      await moviesRepository.save(movie);
    }
  }

  console.log('[Done]');
}

main();
