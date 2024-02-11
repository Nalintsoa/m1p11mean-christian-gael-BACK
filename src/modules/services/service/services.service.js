const Service = require("@schema/service");

class ServiceService {

    createService = async (data) => {
        const response = await Service.create(data);
        return response;
    }

    getAllService = async (filter) => {
        const response = await Service.find(filter);
        return response;
    }

    getService = async (filter) => {
        const response = await Service.findOne(filter);
        return response;
    }

    updateService = async (filter, data) => {
        const response = await Service.updateOne(filter, data);
        return response;
    };

    deleteService = async (filter) => {
        const response = await Service.deleteOne(filter);
        return response;
    }


}

module.exports = ServiceService;