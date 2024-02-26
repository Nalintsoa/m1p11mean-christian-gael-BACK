const Staff = require("../../../schema/staff");
const RDV = require("../../../schema/rdv");
const getNumberDaysInMonth = require("../../../utils/getNumberDaysInMonth");

class StatisticsService {
    statisticEmployee = async (type, date) => {
        let filter;
        let numberDay;
        if (type === "month") {
            console.log("data", date)
            const month = date.split("-")[1];
            const year = date.split("-")[0];

            numberDay = getNumberDaysInMonth(year, month)

            filter =
            {
                $and: [
                    {

                        date: { $gte: date }
                    },
                    {
                        date: { $lt: `${year}-${month + 1}` }
                    }
                ]
            }
        }
        if (type === "date") {
            numberDay = 1;
            filter = { date }

        }

        const staffs = await Staff.find({ role: "employee" });
        const result = [];

        for (let i = 0; i < staffs.length; i++) {
            const startHour = staffs[i].startHour.split(":")[0];
            const endHour = staffs[i].endHour.split(":")[0];
            const hourDispo = Number(endHour) - Number(startHour);
            const sumHourDispo = hourDispo * numberDay;

            const rdvs = await RDV.find({
                ...filter,
                employee: staffs[i]._id,
            }).populate("service");


            let sumHourWorking = 0;
            for (let j = 0; j < rdvs.length; j++) {
                const duration = rdvs[j].service.duration;
                sumHourWorking += duration;
            }

            const average = (sumHourWorking / sumHourDispo * 100).toFixed(2);

            const dataToPush = { _id: staffs[i]._id, firstName: staffs[i].firstName, hourAverage: average }

            result.push(dataToPush);

        };

        return result;

    }

}



module.exports = StatisticsService;