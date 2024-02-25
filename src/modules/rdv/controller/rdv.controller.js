const RdvService = require("../service/rdv.service")
const CustomerService = require("../../customer/service/customer.service")

class RdvController {
    constructor() {
        this.rdvService = new RdvService();
        this.customerService = new CustomerService();
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
        const { restSolde } = data;
        const customer = req.userId;
        try {
            const response = await this.rdvService.createRdv({ ...data, customer });
            // décompter le montant payé
            await this.customerService.updateCustomer({ _id: customer }, { solde: restSolde })

            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    getHistoRDV = async (req, res) => {
        const customer = req.userId;
        try {
            const response = await this.rdvService.getHistoRdv({ customer });
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    payRdv = async (req, res) => {
        const data = req.body;
        const { restSolde, _id } = data;
        delete data._id;
        const customer = req.userId;



        try {
            const response = await this.rdvService.updateRdv({ _id }, data);
            // décompter le montant payé
            await this.customerService.updateCustomer({ _id: customer }, { solde: restSolde })

            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = RdvController;