const StaffService = require('@modules/staff/service/staff.service');

class StaffController {
	constructor() {
		this.staffService = new StaffService();
	}

	createStaff = async (req, res) => {
		const data = req.body;
		try {
			const result = await this.staffService.createStaff(data);
			res.status(200).send({result, message: 'Personnel ajouté avec succès'});
		} catch (err) {
			res.status(500).send("Une erreur est survenue");
		}
	}

	getAllStaff = async (req, res) => {
		try {
			const result = await this.staffService.getAllStaff();
			return res.status(200).send(result);
		} catch (err) {
			res.status(500).send('Impossible de lister les personnels');
		}
	}

	updateStaff = async (req, res) => {
		const data = req.body;
		try {
			const result = await this.staffService.updateStaff(data.id, data);
			return res.status(200).send(result);
		} catch (err) {
			res.status(500).send('Impossible de mettre à jour le personnel choisi');
		}
	}

	deleteStaff = async (req, res) => {
		const data = req.body;
		try {
			const result = await this.staffService.deleteStaff(data.id);
			return res.status(200).send(result);
		} catch (err) {
			res.status(500).send('Impossible de mettre à jour le personnel choisi');
		}
	}

	getStaff = async (req, res) => {
		const { id } = req.params;
		try{
			const result = await this.staffService.getStaff(id);
			return res.status(200).send(result);
		} catch (err) {
			res.status(500).send("Impossible d'avoir les informations du personnel");
		}
	}

	getStaffBySpeciality = async (req, res) => {
		const { customer, speciality, prefType } = req.body;

		const isFavorite = prefType === "Favoris";
		try{
			const result = await this.staffService.getStaffBySpeciality(speciality);
			return res.status(200).send(result);
		} catch (err) {
			res.status(500).send("Failed to list staffs");
		}

	}
}

module.exports = StaffController;