const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/hashPass");

exports.register = async (req, res) => {
	try {
		const { userName, email, password, phoneNumber, address } = req.body;

		if (!userName.trim()) {
			return res.json({ error: "Username is required" });
		}
		if (!email.trim()) {
			return res.json({ error: "Email is required" });
		}
		if (!password.trim() || password.length < 6) {
			return res.json({
				error: "Password must be at least 6 characters long",
			});
		}
		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.json({ error: "Email Existed" });
		}
		const hashedPassword = await hashPassword(password);

		const newUser = await new User({
			userName,
			email,
			password: hashedPassword,
			phoneNumber,
			address,
		}).save();

		const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_KEY, {
			expiresIn: "1h",
		});
		res.json({ status: "Successfully registered", token });
	} catch (error) {
		res.json(error.message);
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email) {
			return res.json({ error: "email is required" });
		}
		if (!password || password.length < 6) {
			return res.json({ error: "Password is wrong!" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ error: "No user data has found" });
		}

		const matchPassword = await comparePassword(password, user.password);
		if (!matchPassword) {
			res.json({ error: "Invalid email or password" });
		}

		const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
			expiresIn: "1h",
		});

		res.json({
			status: "valid user",
			token,
		});
	} catch (error) {
		res.json(error.message);
	}
};

exports.profileShow = async (req, res) => {
	try {
		const user = req.headers.authorization;
		const profile = await User.findById(user._id);
		res.json(profile);
	} catch (error) {
		res.json(error.message);
	}
};

exports.updateProfile = async (req, res) => {
	try {
		const { userName, password, phoneNumber, address } = req.body;

		const decodedUser = req.headers.auth;
		const user = User.findById(decodedUser._id);

		if (password && password.length < 6) {
			return res.json({
				error: "Password must be at least 6 characters long",
			});
		}
		const hashedPassword = password
			? await hashPassword(password)
			: undefined;

		const updated = await User.findByIdAndUpdate(
			decodedUser._id,
			{
				userName: userName || user.userName,
				password: hashedPassword || user.password,
				phoneNumber: phoneNumber || user.phoneNumber,
				address: address || user.address,
			},
			{ new: true }
		);
		updated.password = undefined; // so that in the response password will not be shown.
		res.json(updated); //updated is a obj, so do not use {}
	} catch (error) {
		res.json(error.message);
	}
};
