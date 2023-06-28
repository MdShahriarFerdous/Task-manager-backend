const OTPModel = require("../models/OTPModel");
const { sendOTP } = require("../utility/emailUtility");

exports.sendOTP = async (req, res) => {
	try {
		const email = req.params.email;
		let OTPCode = Math.floor(1000 + Math.random() * 900000);

		//create a otp document
		await OTPModel.create({
			email: email,
			otp: OTPCode,
		});

		//call the utility function
		let result = await sendOTP(
			email, //EmailTo
			`Verification Code: ${OTPCode}`, //EmailText
			"Verification Code" //EmailSubject
		);

		res.json({ data: result, status: "Verification code sent " });
	} catch (error) {
		res.json(error.mesage);
	}
};

exports.verifyOTP = async (req, res) => {
	try {
		const email = req.params.email;
		const otp = req.params.otp;

		let otpData = await OTPModel.find({
			email,
			otp,
			status: 0,
		});

		if (otpData) {
			await OTPModel.updateOne(
				{
					email,
					otp,
					status: 0,
				},
				{
					status: 1,
				}
			);
			res.json({ status: "verified!" });
		}
	} catch (error) {
		res.json(error.message);
	}
};
