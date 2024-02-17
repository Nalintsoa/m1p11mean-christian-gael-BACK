const AuthService = require("../service/auth.service");

class AuthController {
	constructor(){
		this.authService = new AuthService();
	}

	staffLogin = async (req, res) => {
		const { email, password } = req.body;

		try {
			const { staff, token, logged, message } = await this.authService.staffLogin(email, password);

			if (logged) {
				res.cookie("jwt_token", token, {
					maxAge: 24 * 60 * 60 * 1000,
					sameSite: 'Lax',
					secure: false
				});

				res.cookie('leeee', token, {
					maxAge: 24 * 60 * 60 * 1000,
					sameSite: 'None',
					secure: false,
					httpOnly: false
				});

				res.cookie('leo', 'be');
				// req.session.token = token;

				res.status(200).send({
					message: 'logged in',
					staff
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
		console.log('ato');
		res.cookie("jwt_token", "", {maxAge: 0});
		res.status(200).send({ message: 'logged out' });
	}
}

module.exports = AuthController;