require("dotenv").config();
const nodemailer = require("nodemailer");

exports.sendOTP = async (EmailTo, EmailText, EmailSubject) => {
	// transporter
	let transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	// mail options
	let mailOptions = {
		from: process.env.EMAIL,
		to: EmailTo,
		subject: EmailSubject,
		text: EmailText,
	};
	//send mail
	return await transporter.sendMail(mailOptions);
};
