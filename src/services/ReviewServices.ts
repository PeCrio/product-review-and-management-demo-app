import axios from "axios";
import { ReviewI } from "utils/types";

export const createReview = async (values: ReviewI) => {
	const res = await axios.post("/reviews", values);
	return res.data;
};
export const getAllReviews = async () => {
	const res = await axios.get("/reviews");
	return res.data;
};
