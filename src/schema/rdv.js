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
        required:false
    }

});

const RDV = model("rdv", rdvSchema);

module.exports = RDV;