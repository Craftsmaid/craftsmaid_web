const { default: mongoose } = require("mongoose");

const dayMenuSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is Required"],
	},
	foodItems: [
		{
			type: String,
		},
	],
	week: Number
});

module.exports = dayMenuSchema;
