const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const validator = require("validator");

config();

const jwtPrivateKey = process.env.JWT_PRIVATE_KEY.replace(/\\n/g, "\n");

const userSchema = new mongoose.Schema(
	{
		name: {
            type: String,
            required: [true, "FullName is required"]
        },
        username: {
            type: String,
            required: [true, "Username is required"]
        }, 
		email: {
            type: String,
            validate: [validator.isEmail, "You need to provide a valid email address"],
            required: [true, "Email is required"]
        },
		password: {
            type: String,
            required: [true, "password is required"]
        },
        phone: {
            type: String,
            minlength: 10,
            maxlength: 12
        },
		wards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Ward",
			},
		],
		resetPasswordToken: String,
		resetPasswordExpires: Date,
	},
	{ timestamps: true }
);

// hash passwords before saving user
userSchema.pre("save", async function (next)  {
	// check if password field has been provided or if the user has changed his password before
	if (!this.password || !this.isModified("password")) {
		return next;
	}

	// hash user password with bcrypt
	this.password = await bcrypt.hash(
		this.password,
		parseInt(process.env.HASH)
	);
	next();
});

// before user is sent to request remove passwords
userSchema.methods.toJSON = function () {
	const userObj = this.toObject();
	delete userObj.password;

	return userObj;
};

// compare password method to validate passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// generate token for verification when user sends a request
userSchema.methods.generateVerificationToken = function () {
	return jwt.sign({ id: this._id }, jwtPrivateKey, {
		expiresIn: "10d",
		algorithm: "RS256",
	});
};

module.exports = userSchema;
