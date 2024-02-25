const CustomerService = require("@modules/customer/service/customer.service");
const cron = require('node-cron');
const RdvService = require("../../rdv/service/rdv.service");
const ServiceService = require("../../services/service/services.service");
const Customer = require("../../../schema/customer");
const bcrypt = require("bcryptjs");
class CustomerController {
    constructor() {
        this.customerService = new CustomerService();
        this.rdvService = new RdvService();
    }

    getCustomer = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.customerService.getCustomer(id);
            res.status(200).send(result);
        } catch {
            res.status(500).send("Failed to find customer");
        }
    }

    register = async (req, res) => {
        const data = req.body;
        try {
            const result = await this.customerService.register(data);
            res.status(200).send({ result, message: 'Client ajouté' });
        } catch (error) {
            res.status(500).send("Impossible d'enregistrer le client")
        }
    }

    customerLogin = async (req, res) => {
        const { email, password } = req.body;
        const socketIo = req.app.get("socket_io");
        try {
            const { customer, token, logged, message } = await this.customerService.customerLogin(email, password);

            // TODO use .env
            if (logged) {
                res.cookie("client_token", token, {
                    maxAge: 1 * 60 * 60 * 1000,
                    sameSite: 'Lax',
                    secure: false
                });

                const alertCustomer = await this.rdvService.getRdvWithCustomerAlert(customer._id);

                let alertArray = [];
                if (alertCustomer && alertCustomer.length > 0) {
                    alertArray = alertCustomer.filter((item) => {
                        const dateCondition = new Date(item.date).getTime() >= new Date().getTime();
                        const isAlertBeforeDateRdv = !!item.rappel && new Date(item.rappel).getTime() <= new Date(item.date).getTime();
                        return dateCondition && isAlertBeforeDateRdv;
                    });
                }

                // TODO using socket
                // if (alertArray.length > 0) {
                //     for (let i = 0; i < alertArray.length; i++) {
                //         const minute = alertArray[i].rappel.getMinutes();
                //         const hour = alertArray[i].rappel.getHours();
                //         const day = alertArray[i].rappel.getDate();
                //         const month = alertArray[i].rappel.getMonth() + 1;

                //         const task = cron.schedule(`${minute} ${hour} ${day} ${month} *`, () => {
                //             console.log('Notification client envoyée');
                //             socketIo.emit('logged_in', 'test notification')
                //             task.stop();
                //         }, {
                //             scheduled: false,
                //         });

                //         task.start();
                //     }
                // }

                res.status(200).send({
                    message: 'logged in',
                    customer,
                    alertArray,
                    token
                });
            } else {
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
        res.cookie("client_token", "", { maxAge: 0 });
        res.status(200).send({ message: 'logged out' });
    }

    addOrRemoveServiceToPreferences = async (req, res) => {
        try {
            const { customer, service } = req.body;
            const result = await this.customerService.addOrRemoveServiceToPreferences(customer, service);
            res.status(200).send({ result, message: "Preferences updated" });
        } catch (error) {
            console.log(error);
            res.status(500).send('Failed to add to preferences');
        }
    }

    getFavoriteEmployees = async (req, res) => {
        try {
            const { customer } = req.params;
            const result = await this.customerService.getFavoriteEmployees(customer);
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send('Failed to list favorite employees');
        }
    }

    addOrRemoveEmployeeAsFavorite = async (req, res) => {
        try {
            const { customer, employee } = req.body;

            const result = await this.customerService.addOrRemoveEmployeeAsFavorite(customer, employee);
            res.status(200).send({ result, message: "Favorite employees list updated" });
        } catch (error) {
            res.status(500).send('Failed to update favorite employees list');
        }
    }

    forgetPassword = async (req, res) => {
        try {
            const { customerEmail } = req.body;

            const result = await this.customerService.forgetPassword(customerEmail);

            if (result === false) {
                return res.status(401).send("L'utilisateur n'existe pas");
            }
            return res.status(200).send(result);
        } catch (error) {
            res.status(500).send('Failed to verify mail');
        }
    }

    checkTemporaryPassword = async (req, res) => {
        try {
            const { customerEmail, temporaryPassword } = req.body;

            const customer = await Customer.findOne({ email: customerEmail });

            if (!bcrypt.compareSync(temporaryPassword, customer.temporaryPassword)) {
                res.status(500).send({
                    matched: false,
                    message: "Mot de passe incorrect",
                })
            }

            res.status(200).send({message: 'okkkkkk'});

        } catch (error) {
            console.log(error);
            res.status(500).send('Error when checking temporary password');
        }
    }

    updatePassword = async (req, res) => {
        try {
            const {customerEmail, password} = req.body;

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await Customer.findOneAndUpdate({ email: customerEmail }, { password: hashedPassword });
            res.status(200).send({ message: 'updated' });
        } catch (err) {
            res.status(500).send('Error when updating password');
        }
    }
}

module.exports = CustomerController;