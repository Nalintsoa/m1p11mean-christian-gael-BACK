require('module-alias/register');
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("@modules/app/routes");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT;

app.use(cors({
	credentials: true,
    exposedHeaders: ["token"],
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  }));

app.use(express.json());
app.listen(PORT, () => {
	console.log(`The server is active on port ${PORT}`);
});

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Database connection successful');
	})
	.catch((err) => {
		console.error('Database connection failed');
	});

app.use(function(req, res, next) {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept"
	);
	next();
	});

app.use("/", routes);

app.use("/uploads", express.static("uploads"));


