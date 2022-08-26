const User = require("../models/user.model");
const { sendEmail } = require("./mail.controller")

const createCookieFromToken = async (user, req) => {
	const token = user.generateVerificationToken();

	//cookies expire after 10days
	const cookieOptions = {
		expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
		httpOnly: true,
		secure: req.secure || req.headers["x-forwarded-proto"] === "https",
	};

	return { cookieOptions, token };
};

// login
const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		if(!username || !password) {
			return res.status(401).json({
				status: 'failed',
				message: "You need to provide username or password"
			})
		}
        // Check if user with email exists either with email or password
		const user = await User.findOne({
			$or: [{ username }, { email: username }],
		});

		// check if password is valid
		const confirmPassword = await user.comparePassword(password);

		// Send Error if user does not exist or password incorrect
		if (!user || !confirmPassword) {
			return res.status(401).json({
				status: "Failed",
				message: "Username/Email Or Password Incorrect",
			});
		}

		// create cookie session for user for persistence
		const { cookie, token } = await createCookieFromToken(user, req);
		res.cookie("jwt", token, cookie);
		res.status(200).json({
			status: "Login Successful!",
			token,
			user,
		});
	} catch (err) {
		res.status(400).json({
			status: "Failed",
			message: err.message,
		});
	}
};

// signup
const signup = async (req, res) => {
	const {name, email, username, password, phone} = req.body;
	try {
		// Check if Email or Username Exists and send an error if either does exist
		const checkEmail = await User.findOne({email});
		if(checkEmail) {
			return res.status(401).json({
				status: 'Failed',
				message: "Email already registered"
			});
		}
		const checkUsername = await User.findOne({username});
		if(checkUsername) {
			return res.status(401).json({
				status: 'Failed',
				message: "Username already registered"
			});
		}

		const user = new User({
			name,
			username,
			email,
			password,
			phone
		});

		await user.save();
		res.status(200).json({
			status: 'success',
			message: "SignUp Successful! Please Login"
		})
	} catch (err) {
		res.status(400).json({
			status:'Failed',
			message: err.message
		})
	}
}

const resetPassword = async (req, res) => {
	const { email } = req.body
	try {
		const checkEmail = await User.findOne({ email });

		if (!checkEmail) {
			res.status(409).json({
				status: 'error',
				message: 'Email not registered, Register instead.',
			});
			return false
		}

		const payload = {
			id: checkEmail._id,
			email
		}

		const secret = checkEmail.password + '-' + new Date(checkEmail.createdAt).getTime()

		// create a token that expires in 5mins
		const token = jwt.sign(payload, secret, {
			expiresIn: 300,
		})

		checkEmail.resetPasswordToken = token
		checkEmail.resetPasswordExpires = Date.now() + 300000 //add 5mins expiration
		await checkEmail.save()

		const sendresetEmail = await sendEmail({
			from: 'NoReply@CraftsMaid.com',
			to: email,
			subject: 'Password Reset!',
			message: `<h1>You requested a password reset</h1> <br/> If you did not apply for this request, ignore this email. Click <a href="https://www.trails247.com/resetPassword/${payload.id}/${token}">here</a> to reset password. <br/> Link will expire in 5mins`
		})

		if (sendresetEmail.message) {
			res.status(400).json({
				status: 'error',
				message
			})

			return false
		}
		res.status(200).json({
			status: 'success',
			data: sendresetEmail
		})

	}
	catch (err) {
		res.status(400).json({
			status: 'error',
			message: err.message
		})
	}
}

module.exports = {
	login,
	signup
}