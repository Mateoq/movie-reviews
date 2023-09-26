// import { Link } from "@chakra-ui/next-js";
import { Card, CardBody, Heading, Image, Link } from "@chakra-ui/react";

import { MovieData } from "../types";

export interface MovieCardProps {
  data: MovieData;
}

export const MovieCard = (props: MovieCardProps) => {
  const { data } = props;
  const { BASE_PATH, TMDB_IMAGE_BASE_PATH } = process.env;
  const src = `${TMDB_IMAGE_BASE_PATH}${data.image}`;
  const alt = `Movie: ${data.image} poster`;
  const link = `${BASE_PATH}/movies/${data.id}`;
  return (
    <Link href={link}>
      <Card maxW="200px" minW="200px" minH="361px">
        <CardBody>
          <Image
            src={src}
            alt={alt}
            borderRadius="lg"
          />
          <Heading mt="6" size="sm">
            {data.title}
          </Heading>
        </CardBody>
      </Card>
    </Link>
  );
};
