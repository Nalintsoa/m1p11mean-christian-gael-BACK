const jwt = require("jsonwebtoken");

const verifyAccessToken = (token) => {
  const secret = 'secret';

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

const authenticateToken = (req, res, next) => {
	const token = req.cookies.jwt_token;
	// const authHeader = req.headers['authorization'];
	// const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		return res.sendStatus(401);
	}

	const result = verifyAccessToken(token);

	if (!result.success) {
		return res.status(403).json({ error: result.error });
	}

	req.user = result.data;
	next();
}

module.exports = authenticateToken;