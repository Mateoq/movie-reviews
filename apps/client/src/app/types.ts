export interface ReviewData {
  id: string;
  username: string;
  movieId: string;
  rating: number;
}

export interface MovieData {
  id: string;
  tmdbId: number;
  title: string;
  image: string;
  reviews: ReviewData[];
}

export interface ReviewFormData {
  username: string;
  rating: number;
}

export interface SubmitReviewHandler {
  (formData: ReviewFormData): void;
}

export interface CreateReviewData {
  movieId: string;
  username: string;
  rating: number;
}
