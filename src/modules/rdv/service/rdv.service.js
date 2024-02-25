const RDV = require("../../../schema/rdv");
const Staff = require("../../../schema/staff");

class RdvService {

    createRdv = async (data) => {
        const response = await RDV.create(data);
        return response
    }
    updateRdv = async (filter, data) => {
        const response = await RDV.updateOne(filter, data);
        return response
    }

    getHistoRdv = async (data) => {
        const response = await RDV.find(data).sort({ dateBook: -1 }).populate("service").populate("employee");
        return response;
    }

    checkDispo = async (data) => {
        const { date, category } = data;
        const employees = await Staff.find({ speciality: category, role: 'employee' });

        let formatedArray = [];

        for (let i = 0; i < employees.length; i++) {
            const rdv = await RDV.find({ date, employee: employees[i]._id });
            const obj = {};

            const tabsRdv = [];

            for (let j = 0; j < rdv.length; j++) {
                for (let ji = Number(rdv[j].startHour); ji < Number(rdv[j].endHour); ji++) {
                    tabsRdv.push(ji);
                }
            }

            obj['7'] = { firstName: employees[i].firstName }

            for (let k = 8; k < 17; k++) {

                if (tabsRdv.includes(k)) {
                    obj[`${k}`] = { value: k, dispo: false, _id: employees[i]._id, }
                } else {
                    obj[`${k}`] = { value: k, dispo: true, _id: employees[i]._id, }
                }

            }

            formatedArray = [...formatedArray, obj];

        }

        return formatedArray;
    }

    getRdvWithCustomerAlert = async (idCustomer) => {
        try {
            const response = await RDV.find({ customer: idCustomer })
                .populate("service")
                .populate("employee");
            return response;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = RdvService;