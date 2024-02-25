const mongoose = require("mongoose");
const makeId = require("../utils/generateRandomPassword");
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
	},
	preferences: {
		type: [Schema.Types.ObjectId],
		default: []
	},
	favoriteEmployees: {
		type: [Schema.Types.ObjectId],
		default: [],
	},
	solde: {
		type: Number,
	},
	cardNumber: {
		type: String
	},
	temporaryPassword: {
		type: String,
		default: makeId(10),
	}
});

const Customer = model("Customer", CustomerSchema);

module.exports = Customer;