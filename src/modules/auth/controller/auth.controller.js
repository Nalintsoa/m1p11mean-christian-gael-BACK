const AuthService = require("../service/auth.service");

class AuthController {
	constructor(){
		this.authService = new AuthService();
	}

	staffLogin = async (req, res) => {
		const { email, password } = req.body;

		try {
			const { staff, token, logged, message } = await this.authService.staffLogin(email, password);

			// TODO use .env
			if (logged) {
				res.cookie("jwt_token", token, {
					maxAge: 1 * 60 * 60 * 1000,
					sameSite: 'None',
					secure: true
				});

				res.status(200).send({
					message: 'logged in',
					staff,
					token
				})
			} else {
				console.log('message', message);
				res.status(500).send({
					message
				})
			}
		} catch (err) {
			res.status(500).send('failed to log in');
		}
	}

	staffLogout = async (req, res) => {
		res.cookie("jwt_token", "", {maxAge: 0});
		res.status(200).send({ message: 'logged out' });
	}
}

module.exports = AuthController;