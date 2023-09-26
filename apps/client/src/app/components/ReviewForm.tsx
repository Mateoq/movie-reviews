'use client';

import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  VStack,
  Select,
  Input,
  Heading,
} from '@chakra-ui/react';

import { ReviewFormData, SubmitReviewHandler } from '../types';

const MAX_RATING = 10;
const ratingArr = Array.from({ length: MAX_RATING + 1 })
const initialState = {
  username: '',
  rating: 0
};

export interface ReviewFormProps {
  isLoading?: boolean;
  onSubmit?: SubmitReviewHandler;
}

export const ReviewForm = (props: ReviewFormProps) => {
  const { isLoading, onSubmit = () => {} } = props;
  const [formData, setFormData] = useState<ReviewFormData>(initialState);
  const [usernameHasError, setUsernameHasError] = useState(false);
  const [ratingHasError, setRatingHasError] = useState(false);

  const changeUsernameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value || value === '') {
      setUsernameHasError(true);
    } else {
      setUsernameHasError(false);
    }

    setFormData({ ...formData, username: value });
  }

  const changeRatingHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const rating = parseInt(value, 10);
    console.log('RATING', value, rating);
    if (!rating || Number.isNaN(rating) || rating === -1) {
      setRatingHasError(true);
      return;
    } else {
      setRatingHasError(false);
    }

    setFormData({ ...formData, rating });
  }

  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.rating === -1 || formData.username === '') {
      return;
    }

    onSubmit(formData);
    setFormData(initialState);
  }

  return (
    <form onSubmit={submitFormHandler}>
      <VStack alignItems="flex-start" rowGap="10px">
        <Heading size="sm">Add Review</Heading>
        <FormControl isRequired isInvalid={usernameHasError}>
          <FormLabel>Username</FormLabel>
          <Input
            placeholder="Username"
            value={formData.username}
            isDisabled={isLoading}
            onChange={changeUsernameHandler}
          />
          {usernameHasError && (
            <FormErrorMessage>Username is required</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={ratingHasError}>
          <FormLabel>Rating</FormLabel>
          <Select
            placeholder="0"
            value={formData.rating}
            isDisabled={isLoading}
            onChange={changeRatingHandler}
          >
            {ratingArr.map((_, index) => (
              <option key={`option_${index}`} value={index}>
                {index}
              </option>
            ))}
          </Select>
          {ratingHasError && (
            <FormErrorMessage>Rating is required</FormErrorMessage>
          )}
        </FormControl>
        <Button type="submit" isLoading={isLoading}>
          Create
        </Button>
      </VStack>
    </form>
  );
};
