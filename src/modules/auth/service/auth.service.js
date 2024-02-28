const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Staff = require("@schema/staff");

class AuthService {
    staffLogin = async (email, password) => {
        const staff = await Staff.findOne({ email:email });
        
        if (!staff) {
            return {
                logged: false,
                message: "L'utilisateur n'existe pas",
            };
        }

        if (!bcrypt.compareSync(password, staff.password)) {
            return {
                logged: false,
                message: "Mot de passe incorrect",
            }
        }

        // TODO use .env
        const { _id } = staff.toJSON();
        const token = await jwt.sign({ _id, username: staff.name, role: staff.role }, 'secret', {expiresIn: 60 * 60});

        return {
            logged: true,
            token,
            staff
        }
    }
}

module.exports = AuthService;