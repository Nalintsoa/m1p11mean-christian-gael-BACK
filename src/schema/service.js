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
    },
    description: {
        type: String
    },
    category: {
        type: String
    },
    path: {
        type: String,
        required: true
    },
    specialOffer: {
        type: Boolean
    },
    startOffer: {
        type: Date
    },
    endOffer: {
        type: Date
    },
    oldPrice: {
        type: Number
    },
    seenOffer: {
        type: Boolean
    }

});

const Service = model("Service", ServiceSchema);

module.exports = Service;