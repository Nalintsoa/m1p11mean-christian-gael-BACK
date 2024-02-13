const ServiceService = require("@modules/services/service/services.service")

class ServiceController {
    constructor() {
        this.serviceService = new ServiceService()
    }

    createService = async (req, res) => {
        const data = req.body;
        try {
            const service = await this.serviceService.createService(data);
            return res.status(200).send(service);

        } catch (error) {
            console.log(error);
            return res.status(500).send("Une erreur s' est survenue");
        }
    }

    getAllService = async (req, res) => {
        const data = req.body;
        try {
            const services = await this.serviceService.getAllService(data);
            return res.status(200).send(services);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Une erreur s' est survenue");
        }

    }

    getService = async (req, res) => {
        const data = req.body;
        try {
            const service = await this.serviceService.getService(data);
            return res.status(200).send(service);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Une erreur s' est survenue");
        }

    }

    updateService = async (req, res) => {
        const data = req.body;
        try {
            await this.serviceService.updateService(data);
            return res.status(200).send("success");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Une erreur s' est survenue");
        }

    }

    deleteService = async (req, res) => {
        const data = req.body;
        try {
            await this.serviceService.deleteService({ _id: data._id });
            return res.status(200).send("success");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Une erreur s' est survenue");
        }

    }


}

module.exports = ServiceController;