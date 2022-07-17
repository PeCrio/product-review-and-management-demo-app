import axios from "axios";
import { ReviewI, ReviewRatingI } from "utils/types";

// type RandomReviewRating = {
// 	user: string;
// 	email: string;
// 	comment: string;
// 	rating: ReviewRatingI;
// 	date: Date;
// };

// type RandomRatingResponse = {
// 	ratings: RandomReviewRating[];
// };

// export const getAllReviews = async () => {
// 	const res = await axios.get<RandomRatingResponse>(
// 		"https://random-ratings.vercel.app/api/ratings"
// 	);
// 	return {
// 		data: res.data.ratings.map(({ user, date, ...params }) => ({
// 			...params,
// 			firstname: user,
// 			lastname: "",
// 		})),
// 	};
// };

type RatingCreatedI = {
  success: boolean;
  data: ReviewI;
  message: string;
};
type AllReviewsI = {
  success: boolean;
  data: ReviewI[];
  message: string;
};

export const createReview = async (values: ReviewI) => {
  const res = await axios.post<RatingCreatedI>("/reviews", values);
  return res.data;
};
export const getAllReviews = async () => {
  const res = await axios.get<AllReviewsI>("/reviews");
  return res.data;
};
