export type ReviewRatingI = 1 | 2 | 3 | 4 | 5;
export interface ReviewI {
	firstname: string;
	lastname: string;
	email: string;
	rating: ReviewRatingI;
	comment: string;
	_id?: string;
}
