const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const CustomerSchema = new Schema({
	pseudo: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	address: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

const Customer = model("Customer", CustomerSchema);

module.exports = Customer;