import axios from 'axios';
import { VStack } from "@chakra-ui/react";

import { ReviewForm, MovieDetail } from '../../components';
import { MovieData } from '../../types';

async function reqMovie(id: string): Promise<MovieData> {
  const { SERVICES_HOST, SERVICES_PORT } = process.env;
  const url = `${SERVICES_HOST}:${SERVICES_PORT}/movies/${id}`;
  const movie = await axios.get<MovieData>(url).then(res => res.data);

  return movie;
}

interface MoviePageProps {
  params: { id: string };
}

export default async function Movie(props: MoviePageProps) {
  const { params } = props;
  const { TMDB_IMAGE_BASE_PATH } = process.env;
  const movie = await reqMovie(params.id);

  console.log('DATA', movie);
  return (
    <main>
      <VStack w="100vw" maxW="1280px" margin="40px auto">
        <MovieDetail data={movie} imageBasePath={TMDB_IMAGE_BASE_PATH as string}/>
      </VStack>
    </main>
  );
}
