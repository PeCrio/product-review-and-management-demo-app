import { ReviewI } from "./types";

export const getReviewSummary = (reviews: ReviewI[] | []) =>
	reviews
		.map((review) => ({ rating: review.rating }))
		.reduce(
			(summary, review) => {
				if (summary[review.rating]) {
					summary[review.rating] += 1;
				} else {
					summary[review.rating] = 1;
				}
				return summary;
			},
			{
				1: 0,
				2: 0,
				3: 0,
				4: 0,
				5: 0,
			}
		);
export const getPercentageOfRatingsGreaterThanTwo = (
	reviews: ReviewI[] | []
) => {
	const reviewSummary = getReviewSummary(reviews);
	let totalRatings = 0;
	let ratingsGreaterThanTwo = 0;

	for (const [rating, value] of Object.entries(reviewSummary)) {
		if (Number(rating) > 2) {
			ratingsGreaterThanTwo += value;
		}
		totalRatings += value;
	}
	if (ratingsGreaterThanTwo === 0) {
		return 0;
	}
	const val = (ratingsGreaterThanTwo / totalRatings) * 100;
	return Math.round(val * 100) / 100;
};
