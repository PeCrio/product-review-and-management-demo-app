import dbConnect from "utils/db/dbConnect";
import Review from "utils/db/models/Review";
import { ReviewI } from "utils/types";
import type { NextApiRequest, NextApiResponse } from 'next'

dbConnect();

const reviewHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	switch (method) {
		case "GET":
			try {
				const reviews: ReviewI[] = await Review.find({ id: req.query.id }).sort(
					{
						created_at: "desc",
					}
				);

				res
					.status(200)
					.json({ success: true, data: reviews, message: "Records fetched" });
			} catch (error) {
				res.status(400).json({ success: false, message: "Invalid request" });
			}
			break;
		case "POST":
			try {
				const { firstname, lastname, email, rating, comment } = req.body;
				if (!firstname || !lastname || !email || !rating || !comment) {
					throw new Error("All fields are required");
				}
				const review: ReviewI = {
					firstname,
					lastname,
					email,
					rating,
					comment,
				};
				const newReview: ReviewI = await Review.create(review);
				res
					.status(201)
					.json({ success: true, data: newReview, message: "Record created" });
			} catch (error) {
				if(error instanceof Error) {
					res.status(400).json({
						success: false,
						message: error.message
					});
				}

				res.status(400).json({
					success: false,
					message: "Invalid request",
				});
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
};
export default reviewHandler;
