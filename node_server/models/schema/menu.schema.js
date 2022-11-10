const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Name of Menu is Required"],
		},

		days: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "DayMenu",
			},
		],

		week: Number,
	},
	{ timestamps: true }
);

module.exports = menuSchema;
