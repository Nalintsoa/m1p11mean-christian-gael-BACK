const bcrypt = require('bcryptjs');
const Customer = require('../../../schema/customer');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
class CustomerService {
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
                password: hashedPassword
            });
            const response = await customer.save();
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    customerLogin = async (email, password) => {
        const customer = await Customer.findOne({ email:email });
        
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
        const token = await jwt.sign({ _id, pseudo: customer.pseudo }, 'secret', {expiresIn: 60 * 60});

        return {
            logged: true,
            token,
            customer
        }
    }

    addOrRemoveServiceToPreferences = async (idCustomer, service) => {
        try {
            const addOne = await Customer.findById(idCustomer).select('preferences');
            console.log(addOne);

            let prefs = addOne.preferences || [];
            const serviceId = new mongoose.Types.ObjectId(service);

            if (prefs.length === 0 || !prefs.includes(serviceId)) {
                prefs.push(serviceId);
            } else {
                prefs = prefs.filter((item) => {
                    console.log(item.toString() === service);
                    return item.toString() !== service
                });
            }
            const result = await Customer.findByIdAndUpdate(idCustomer, { preferences: prefs }).lean();
            return {...result, preferences: prefs};
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CustomerService;