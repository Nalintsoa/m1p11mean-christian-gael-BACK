const CustomerService = require("@modules/customer/service/customer.service");

class CustomerController {
    constructor(){
        this.customerService = new CustomerService();
    }

    register = async (req, res) => {
        const data = req.body;
        try {
        const result = await this.customerService.register(data);
        res.status(200).send({result, message: 'Client ajouté'});
        } catch (error) {
            res.status(500).send("Impossible d'enregistrer le client")
        }
    }

    customerLogin = async (req, res) => {
        const { email, password } = req.body;
        try{
            const { customer, token, logged, message } = await this.customerService.customerLogin(email, password);

            // TODO use .env
            if (logged) {
                res.cookie("client_token", token, {
                    maxAge: 1 * 60 * 60 * 1000,
                    sameSite: 'Lax',
                    secure: false
                });

                res.status(200).send({
                    message: 'logged in',
                    customer,
                    token
                })
            } else {
                console.log('message', message);
                res.status(500).send({
                    message
                })
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('failed to log in');
        }
    }

    customerLogout = async (req, res) => {
        res.cookie("client_token", "", {maxAge: 0});
		res.status(200).send({ message: 'logged out' });
    }
}

module.exports = CustomerController;