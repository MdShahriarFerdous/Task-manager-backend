const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verify = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const decode = jwt.verify(token, process.env.SECRET_KEY);
		req.headers.auth = decode;
		next();
	} catch (error) {
		return res
			.status(401)
			.json({ status: error.message, failed: "Unauthorized" });
	}
};
