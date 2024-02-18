const { Schema, model } = require('mongoose');

const rdvSchema = new Schema({
    customer: {
        type: String,
        default: 'ClientTest'
        // type: Schema.Types.ObjectId,
        // ref: 'Customer'
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Staff'
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service'
    },
    date: {
        type: String,
    },
    startHour: {
        type: Number,
    },
    endHour: {
        type: Number
    },

});

const RDV = model("rdv", rdvSchema);

module.exports = RDV;