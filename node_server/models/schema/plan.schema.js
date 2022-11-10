const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
	{
		ward: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Ward",
			required: [true, "Ward needed for plan"],
		},
		items: {
			type: Map,
		},
		weekDate: String,
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

module.exports = planSchema;
