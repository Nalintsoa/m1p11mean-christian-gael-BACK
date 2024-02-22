const Service = require("../../../schema/service");

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

    notifySpecialOffer = async (filter, data) => {

        // if (_id) {

        console.log("data", data)

        await Service.updateOne(filter, data)
        const serviceSend = await Service.findOne({ _id: filter._id });
        return serviceSend;

        // } else {
        //     const lastCreated = await Service.findOne({ specialOffer: true }).sort({ _id: -1 });

        //     return lastCreated;
        // }

    }

}

module.exports = ServiceService;