const Service = require("../../../schema/service");

class ServiceService {

    createService = async (data) => {
        const response = await Service.create(data);
        return response;
    }

    getAllService = async (filter) => {
        const response = await Service.find(filter).select({ dateOffer: 0 }).select({ seenOffer: 0 });
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

    notifySpecialOffer = async (userId) => {
        const specialOffers = await Service.find({
            specialOffer: true,
            $or: [
                { seenOffer: { $nin: [userId] } },
                { seenOffer: { $exists: false } }
            ],
            endOffer: { $gte: new Date() }
        }).sort({ dateOffer: -1 });
        return specialOffers;
    }

}

module.exports = ServiceService;