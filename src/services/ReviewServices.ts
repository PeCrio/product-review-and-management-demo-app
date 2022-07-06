import axios from "axios";
import { ReviewI, ReviewRatingI } from "utils/types";

type Rating = {
	user: string;
	email: string;
	comment: string;
	rating: ReviewRatingI;
	date: Date;
};

type RatingResponse = {
	ratings: Rating[];
};

export const createReview = async (values: ReviewI) => {
	const res = await axios.post("/reviews", values);
	return res.data;
};
export const getAllReviews = async () => {
	const res = await axios.get<RatingResponse>(
		"https://random-ratings.vercel.app/api/ratings"
	);
	return {
		data: res.data.ratings.map(({ user, date, ...params }) => ({
			...params,
			firstname: user,
			lastname: "",
		})),
	};
};
