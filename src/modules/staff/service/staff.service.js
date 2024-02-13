const Staff = require("@schema/staff");

class StaffService {
	createStaff = async (data) => {
		const response = await Staff.create(data);
		return response;
	}

	getAllStaff = async () => {
		const response = await Staff.find({});
		return response;
	}

	updateStaff = async (id, data) => {
		const response = await Staff.findByIdAndUpdate(id, data);
		return response;
	}

	deleteStaff = async (id) => {
		const response = await Staff.findByIdAndDelete(id);
		return response;
	}
}

module.exports = StaffService; 