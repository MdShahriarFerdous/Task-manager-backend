// basics
require("dotenv").config();
const { readdirSync } = require("fs");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// security
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(morgan("dev"));

// Database connection
mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.DATABASE)
	.then(() => {
		console.log("Database Connected!");
	})
	.catch((err) => {
		console.log(err.message);
	});

// Routes
readdirSync("./src/routes").map((router) => {
	app.use("/api/v1", require(`./src/routes/${router}`));
});
// Undefined routes
app.use("*", (req, res) => {
	res.json({ Error: "Your request is failed" });
});

app.listen(process.env.PORT || 8000, () => {
	console.log(`Server is running on port:${process.env.PORT}`);
});
