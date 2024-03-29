const { Schema, model } = require('mongoose');

const rdvSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
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
    dateBook: {
        type: Date,
        default: new Date()
    },
    startHour: {
        type: Number,
    },
    endHour: {
        type: Number
    },
    rappel: {
        type: Date,
        required: false
    },
    price: {
        type: Number
    },
    commission: {
        type: Number
    },
    specialOffer: {
        type: Boolean
    },
    amountPaid: {
        type: Number
    },
    paimentArray: {
        type: Array,

    },
    isAlerted: {
        type: Boolean,
        default: false
    },
    isMailSent: {
        type: Boolean,
        default: false,
    }
});

const RDV = model("rdv", rdvSchema);

module.exports = RDV;