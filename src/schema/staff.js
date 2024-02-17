const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const StaffSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique:true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  cinNumber: {
    type: Number,
    required: true,
  },
  careerStart: {
    type: Date,
    required: true,
  },
  startHour: {
    type: String,
    required: true,
  },
  endHour: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "employee"
  },
  password: {
    type: String,
    required: true
  }
});

const Staff = model("Staff", StaffSchema);

module.exports = Staff;
