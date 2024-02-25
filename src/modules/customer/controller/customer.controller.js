const CustomerService = require("@modules/customer/service/customer.service");
const cron = require('node-cron');
const RdvService = require("../../rdv/service/rdv.service");
const ServiceService = require("../../services/service/services.service")
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
                if (alertArray.length > 0) {
                    for (let i = 0; i < alertArray.length; i++) {
                        const minute = alertArray[i].rappel.getMinutes();
                        const hour = alertArray[i].rappel.getHours();
                        const day = alertArray[i].rappel.getDate();
                        const month = alertArray[i].rappel.getMonth() + 1;

                        const task = cron.schedule(`${minute} ${hour} ${day} ${month} *`, () => {
                            console.log('Notification client envoyée');
                            socketIo.emit('logged_in', 'test notification')
                            task.stop();
                        }, {
                            scheduled: false,
                        });

                        task.start();
                    }
                }

                res.status(200).send({
                    message: 'logged in',
                    customer,
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
}

module.exports = CustomerController;