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

    notifySpecialOffer = async (data) => {
        const { _id, oldPrice } = data;

        if (_id) {
            const service = await Service.findOne({ _id });
            if (oldPrice !== service.price) {
                await Service.updateOne({ _id }, { oldPrice })
            }
            const serviceSend = await service.findOne({ _id });
            return serviceSend;
        } else {
            const lastCreated = await Service.findOne({ specialOffer: true }).sort({ _id: -1 });

            return lastCreated;
        }

    }

}

module.exports = ServiceService;