'use client';

import { useState } from 'react';
import axios from 'axios';
import {
  Heading,
  VStack,
  HStack,
  Image,
  Tag,
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { ReviewForm } from './ReviewForm';
import { MovieData, ReviewData, ReviewFormData } from '../types';

export interface MovieDetailsProps {
  data: MovieData;
  imageBasePath: string;
}

export const MovieDetail = (props: MovieDetailsProps) => {
  const { data, imageBasePath } = props;
  const toast = useToast();
  const [reviews, setReviews] = useState<ReviewData[]>(data.reviews ?? []);
  const mutation = useMutation({
    mutationKey: ['createReview'],
    mutationFn: (formData: ReviewFormData) => {
      return axios
        .post("/api/create-review", { movieId: data.id, ...formData })
        .then((res) => res.data.data);
    },
    onSuccess: (data: ReviewData) => {
      toast({ description: 'Review Added!!' });
      setReviews([...reviews, data]);
    },
    onError: () => {
      toast({ description: 'Error while adding review' });
    }
  });
  const src = `${imageBasePath}${data.image}`;
  const alt = `Movie: ${data.title} poster`;

  const submitHandler = (formData: ReviewFormData) => {
    mutation.mutate(formData);
  };

  return (
    <VStack rowGap="20px" alignItems="flex-start">
      <Heading size="lg">{data.title}</Heading>
      <HStack columnGap="20px" alignItems="flex-start">
        <Image src={src} alt={alt} minW="50%" maxW="50%"/>
        {data.reviews.length > 0 ? (
          <TableContainer flex="1">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>Rating</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reviews.map(review => (
                  <Tr key={review.id}>
                    <Td>{review.username}</Td>
                    <Td>
                      <Tag>{review.rating}</Tag>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Heading size="sm">No Reviews</Heading>
        )}
      </HStack>
      <ReviewForm isLoading={mutation.isLoading} onSubmit={submitHandler} />
    </VStack>
  );
};
