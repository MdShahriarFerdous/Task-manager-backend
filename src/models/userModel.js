const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			maxLength: 20,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 40,
		},
		phoneNumber: {
			type: String,
			trim: true,
		},
		address: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);
const User = mongoose.model("User", userSchema);
module.exports = User;
