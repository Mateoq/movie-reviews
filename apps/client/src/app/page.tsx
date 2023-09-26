import { Fragment } from 'react';
import Image from 'next/image'
import { HStack, VStack, Heading } from '@chakra-ui/react';
import axios from 'axios';

import { MovieCard } from './components';
import { MovieData } from './types';

async function reqMovies(): Promise<MovieData[]> {
  const { SERVICES_HOST, SERVICES_PORT } = process.env;
  const url = `${SERVICES_HOST}:${SERVICES_PORT}/movies`;
  const movies = await axios.get<MovieData[]>(url).then(res => res.data);

  return movies;
}

export default async function Home() {
  const movies = await reqMovies();

  return (
    <main>
      <VStack w="100vw" maxW="1280px" margin="40px auto" columnGap="20px">
        <Heading>Movies</Heading>
        <HStack flexWrap="wrap" gap="10px">
          {movies.map(movie => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </HStack>
      </VStack>
    </main>
  );
}
