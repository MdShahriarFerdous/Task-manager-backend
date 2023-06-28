const express = require("express");
const { sendOTP, verifyOTP } = require("../controllers/otpController");
const router = express.Router();

router.get("/send-OTP/:email", sendOTP);
router.get("/verify-OTP/:email/:otp", verifyOTP);

module.exports = router;
