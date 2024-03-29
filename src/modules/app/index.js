require('module-alias/register');
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("@modules/app/routes");
const cookieParser = require("cookie-parser");
const { Server } = require('socket.io');
const MailService = require('../mail/service/mail.service');
const RdvService = require('../rdv/service/rdv.service');


dotenv.config();
const app = express();
app.use(cookieParser());
const PORT = process.env.PORT;

app.use(cors({
	credentials: true,
	exposedHeaders: ["token"],
	origin: "https://m1p11mean-christian-gael-md35.onrender.com",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
}));

app.use(express.json());
const server = app.listen(PORT, () => {
	console.log(`The server is active on port ${PORT}`);
});

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

app.set("socket_io", io);

io.on("connection", (socket) => {

	socket.on("getNotifications", async (data) => {


	})

})

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Database connection successful');
	})
	.catch((err) => {
		console.log(err);
		console.error('Database connection failed');
	});

app.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept"
	);
	next();
});

app.use("/mailImages", express.static('mailImages'));
const rvdService = new RdvService();
// rvdService.checkMailToSend();

app.use("/", routes);

app.use("/uploads", express.static("uploads"));



