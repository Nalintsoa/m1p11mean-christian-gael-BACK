const bcrypt = require('bcryptjs');
const Customer = require('../../../schema/customer');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const MailService = require('../../mail/service/mail.service');
const generateCreditCardNumber = require('../../../utils/generateCardNumber');
class CustomerService {
    constructor(){
        this.mailService = new MailService();
    }

    updateCustomer = async (filter, data) => {
        const response = await Customer.updateOne(filter, data);
        return response;
    }

    getCustomer = async (idCustomer) => {
        try {
            const result = await Customer.findById(idCustomer);
            return result;
        } catch (err) {
            console.log(err);
        }
    }
    register = async (data) => {
        try {
            const { pseudo, email, address, phoneNumber, password } = data;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const customer = new Customer({
                pseudo: pseudo,
                phoneNumber: phoneNumber,
                address: address,
                email: email,
                password: hashedPassword,
                solde: 50000,
                cardNumber: generateCreditCardNumber()

            });
            const response = await customer.save();
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    customerLogin = async (email, password) => {
        const customer = await Customer.findOne({ email: email });

        if (!customer) {
            return {
                logged: false,
                message: "Le client n'existe pas",
            };
        }

        if (!bcrypt.compareSync(password, customer.password)) {
            return {
                logged: false,
                message: "Mot de passe incorrect",
            }
        }

        // TODO use .env
        const { _id } = customer.toJSON();
        const token = await jwt.sign({ _id, pseudo: customer.pseudo }, 'secret', { expiresIn: 60 * 60 });

        return {
            logged: true,
            token,
            customer
        }
    }

    addOrRemoveServiceToPreferences = async (idCustomer, service) => {
        try {
            const addOne = await Customer.findById(idCustomer).select('preferences');

            let prefs = addOne.preferences || [];
            const serviceId = new mongoose.Types.ObjectId(service);

            if (prefs.length === 0 || !prefs.includes(serviceId)) {
                prefs.push(serviceId);
            } else {
                prefs = prefs.filter((item) => {
                    return item.toString() !== service
                });
            }
            const result = await Customer.findByIdAndUpdate(idCustomer, { preferences: prefs }).lean();
            return { ...result, preferences: prefs };
        } catch (err) {
            console.log(err);
        }
    }

    // TODO
    getFavoriteEmployees = async (customerId) => {
        try {
            const result = Customer.findById(customerId).select('favoriteEmployees');
            return result
        } catch (err) {
            console.log(err);
        }
    }

    addOrRemoveEmployeeAsFavorite = async (customerId, employeeId) => {
        try {
            const favorites = await Customer.findById(customerId).select('favoriteEmployees');

            let prefs = favorites.favoriteEmployees || [];

            const employee = new mongoose.Types.ObjectId(employeeId);

            if (prefs.length === 0 || !prefs?.includes(employee)) {
                prefs.push(employee);
            } else {
                prefs = prefs.filter((item) => {
                    return item.toString() !== employeeId
                });
            }

            const result = await Customer.findByIdAndUpdate(customerId, { favoriteEmployees: prefs }).lean();
            return { ...result, favoriteEmployees: prefs };
        } catch (err) {
            console.log(err);
        }
    }

    forgetPassword = async (customerEmail) => {
        try {
            const customer = await Customer.find({ email: customerEmail });

            if (!customer) {
                return false;
            } else {
                const updatedCustomer = await this.mailService.sendForgetPasswordMail(customerEmail);
                return updatedCustomer;
            }
        } catch (err) {
            console.log(err);
        }
    }

    forgetPassword = async (customerEmail) => {
        try {
            const customer = await Customer.find({ email: customerEmail });

            if (!customer) {
                return false;
            } else {
                const updatedCustomer = await this.mailService.sendForgetPasswordMail(customerEmail);
                return updatedCustomer;
            }
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CustomerService;