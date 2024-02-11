const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    commission: {
        type: Number
    }

});

const Service = model("Service", ServiceSchema);

module.exports = Service;