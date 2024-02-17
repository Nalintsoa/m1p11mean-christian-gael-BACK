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
}

module.exports = StaffController;