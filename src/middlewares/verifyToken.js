const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];
	const secret = 'secret';
	// TODO use dotenv
	if (!token) {
		return res.status(403).send({ message: "No token provided!" });
	}

	jwt.verify(token, secret, (err, decoded) => {
		console.log(decoded)
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
			});
		}

		req.userId = decoded._id;
		next();
	});
};

module.exports = {
	verifyToken,
};