const RdvService = require("../service/rdv.service")

class RdvController {
    constructor() {
        this.rdvService = new RdvService();
    }
    checkDispo = async (req, res) => {
        const data = req.query;
        try {
            const response = await this.rdvService.checkDispo(data)
            res.status(200).send(response);

        } catch (error) {
            res.status(500).send(error);
        }
    }

    createRDV = async (req, res) => {
        const data = req.body;
        try {
            const response = await this.rdvService.createRdv(data);
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = RdvController;