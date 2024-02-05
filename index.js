require('module-alias/register');
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

const PORT = process.env.PORT;

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

