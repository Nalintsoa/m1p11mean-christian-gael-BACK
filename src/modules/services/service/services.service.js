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
            ]
        }).sort({ asc: -1 });
        console.log("sepc", specialOffers)
        return specialOffers;

        // await Service.updateOne(filter, data)
        // const serviceSend = await Service.findOne({ _id: filter._id });
        // return serviceSend;
    }

}

module.exports = ServiceService;