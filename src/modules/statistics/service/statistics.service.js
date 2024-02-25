const Staff = require("../../../schema/staff");
const RDV = require("../../../schema/rdv")

class StatisticsService {
    statisticEmployee = async (type, data) => {
        let filter;
        if (type === "month") {
            const month = data.split("-")[1];
            const year = data.split("-")[0];
            filter =
            {
                $and: [
                    {
                        date: { $gte: new Date(year, month - 1) }
                    },
                    {
                        date: { $lt: new Date(year, month) }
                    }
                ]
            }
        }
        // if(type: "")


        const staffs = await Staff.find({ role: "employee" });
        const disponibility = [];
        for (let i = 0; i < staffs.length; i++) {
            const startHour = staffs[i].startHour.split(":")[0];
            const endHour = staffs[i].endHour.split(":")[0];

            const hourDispo = Number(endHour) - Number(startHour);

            const rdvs = await RDV.find({
                ...filter,
                employee: staffs[i]._id,
            });



        }

    }

}



module.exports = StatisticsService;