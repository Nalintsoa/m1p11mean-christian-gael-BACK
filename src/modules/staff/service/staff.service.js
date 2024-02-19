const Staff = require("@schema/staff");
const bcrypt = require('bcryptjs');

class StaffService {
	createStaff = async (data) => {
		try {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(data.password, salt);
			const staff = new Staff({
				...data,
				password: hashedPassword
			});
			const response = await staff.save();
			return response;
		} catch (err) {
			console.log(err);
		}
	}

	getAllStaff = async () => {
		const response = await Staff.find({});
		return response;
	}

	updateStaff = async (id, data) => {
		let updatedStaff = data;
		if (data.password === null) {
			delete data.password;
		} else if (data.password !== null && data.password.trim() !== "") {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(data.password, salt);
			updatedStaff = {
				...data,
				password: hashedPassword
			}
		}
		const response = await Staff.findByIdAndUpdate(id, updatedStaff);
		return response;
	}

	deleteStaff = async (id) => {
		const response = await Staff.findByIdAndDelete(id);
		return response;
	}

	getStaff = async (id) => {
		const response = await Staff.findById(id);
		return response;
	}
}

module.exports = StaffService; 