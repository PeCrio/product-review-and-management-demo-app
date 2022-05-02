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
// export const updateReview = async (values: ReviewI) => {
// 	const res = await axios.put(`/reviews/${values._id}`, values);
// 	return res.data;
// };
// export const deleteReview = async (id: string) => {
// 	const res = await axios.delete(`/reviews/${id}`);
// 	return res.data;
// };
