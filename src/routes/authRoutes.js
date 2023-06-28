const express = require("express");
const router = express.Router();
const { verify } = require("../middlewares/authMiddleware");
const {
	register,
	login,
	profileShow,
	updateProfile,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile-details", verify, profileShow);
router.get("profile-update", verify, updateProfile);

module.exports = router;
