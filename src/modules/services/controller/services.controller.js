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
        const _id = req.params.id
        try {
            const service = await this.serviceService.getService({ _id });
            return res.status(200).send(service);
        } catch (error) {
            console.log(error);
            return res.status(500).send("Une erreur est survenue");
        }

    }

    updateService = async (req, res) => {
        let data = req.body;
        const { _id, priceOffer, specialOffer } = data;
        const socket = req.app.get('socket_io');
        delete data._id;
        try {
            specialOffer && (data = { ...data, dateOffer: new Date() });
            await this.serviceService.updateService({ _id }, data);
            if (priceOffer && specialOffer) {
                const notifications = await this.serviceService.notifySpecialOffer();
                if (notifications.length)
                    socket.emit("notifySpecialOffer", notifications)
            }

            res.status(200).send({ update: 'success' });
        } catch (error) {
            console.log(error);
            return res.status(500).send("Une erreur est survenue");
        }

    }

    deleteService = async (req, res) => {
        const data = req.body;
        try {
            await this.serviceService.deleteService({ _id: data._id });
            return res.status(200).send("success");
        } catch (error) {
            console.log(error);
            return res.status(500).send("Une erreur est survenue");
        }

    }


}

module.exports = ServiceController;