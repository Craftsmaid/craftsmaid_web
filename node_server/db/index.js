const mongoose = require("mongoose");
const { config } = require("dotenv");

config();

const { MONGODB_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(MONGODB_URI, options)
	.then(() => console.log("MongoDB is connected"))
	.catch((err) => {
		console.log("MongoDB connection unsuccessful");
		console.log(err);
	});
