const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: [true, "Please add an first name"],
	},
	lastname: {
		type: String,
		required: [true, "Please add a last name"],
	},
	email: {
		type: String,
		required: [true, "Email address is required"],
	},
	rating: {
		type: Number,
		required: [true, "Please add a rating"],
	},
	comment: {
		type: String,
	},
	created_at: {
		type: Date,
		default: Date.now(),
	},
	updated_at: {
		type: Date,
		default: Date.now(),
	},
});

module.exports =
	mongoose.models.Review || mongoose.model("Review", ReviewSchema);
