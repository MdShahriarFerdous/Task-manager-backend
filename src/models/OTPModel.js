const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		otp: {
			type: String,
			required: true,
			unique: true,
		},
		status: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);
const OTPModel = mongoose.model("OTP", OTPSchema);
module.exports = OTPModel;
