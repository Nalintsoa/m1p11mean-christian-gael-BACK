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
        specialOffer && (data = { ...data, dateOffer: new Date(), seenOffer: [] });
        try {

            const oldService = await this.serviceService.getService({ _id });
            await this.serviceService.updateService({ _id }, data);
            if (priceOffer && specialOffer) {
                const notifications = await this.serviceService.notifySpecialOffer();
                const newOffer = await this.serviceService.getService({
                    _id,
                    endOffer: { $gte: new Date() },
                });

                let isThereAnyUpdates = false;
                if (newOffer)
                    isThereAnyUpdates = newOffer.priceOffer !== oldService.priceOffer ||
                        (newOffer.startOffer).toString() !== (oldService.startOffer).toString() ||
                        (newOffer.endOffer).toString() !== (oldService.endOffer).toString()

                if (notifications.length && newOffer && isThereAnyUpdates)
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

    getNotifications = async (req, res) => {
        const customer = req.userId;

        try {
            const response = await this.serviceService.notifySpecialOffer(customer);
            res.status(200).send(response);

        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    };

    seenNotifications = async (req, res) => {
        try {

        } catch (error) {

        }
    }



}

module.exports = ServiceController;