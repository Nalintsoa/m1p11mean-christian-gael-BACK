const moment = require("moment");
const RDV = require("../../../schema/rdv");
const Staff = require("../../../schema/staff");
const MailService = require("../../mail/service/mail.service");
const planningPerMonthAggregation = require("../pipelines/planningPerMonthAggregation");

class RdvService {
  constructor(){
		this.mailService = new MailService();
	}
  createRdv = async (data) => {
    const response = await RDV.create(data);
    return response;
  };
    updateRdv = async (filter, data) => {
        const response = await RDV.updateOne(filter, data);
        return response
    }

  getHistoRdv = async (data) => {
    const response = await RDV.find(data)
      .sort({ dateBook: -1 })
      .populate("service")
      .populate("employee");
    return response;
  };

  checkDispo = async (data) => {
    const { date, category } = data;
    const employees = await Staff.find({
      speciality: category,
      role: "employee",
    });

    let formatedArray = [];

    for (let i = 0; i < employees.length; i++) {
      const rdv = await RDV.find({ date, employee: employees[i]._id });
      const obj = {};

      const tabsRdv = [];

      for (let j = 0; j < rdv.length; j++) {
        for (
          let ji = Number(rdv[j].startHour);
          ji < Number(rdv[j].endHour);
          ji++
        ) {
          tabsRdv.push(ji);
        }
      }

      obj["7"] = { firstName: employees[i].firstName };

      for (let k = 8; k < 17; k++) {
        if (tabsRdv.includes(k)) {
          obj[`${k}`] = { value: k, dispo: false, _id: employees[i]._id };
        } else {
          obj[`${k}`] = { value: k, dispo: true, _id: employees[i]._id };
        }
      }

      formatedArray = [...formatedArray, obj];
    }

    return formatedArray;
  };

  getRdvWithCustomerAlert = async (idCustomer) => {
    try {
      const response = await RDV.find({
        customer: idCustomer,
        isAlerted: false,
      })
        .populate("service")
        .populate("employee");
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  checkMailToSend = async () => {
    const todayDate = moment().format("YYYY-MM-DD");
    try {
      // TODO add isMailSent condition in query
      let rdvToRemind = await RDV.find({ rappel: { $gte: todayDate } })
        .populate("customer")
        .populate("employee")
        .populate("service");
      rdvToRemind = rdvToRemind.filter((item) => {
        const rappelDate = moment(item.rappel).format("YYYY-MM-DD");
        return rappelDate === todayDate;
      });

			if (rdvToRemind && rdvToRemind?.length > 0) {
				for (let i = 0; i < rdvToRemind.length; i++) {
					await this.mailService.sendAlertRdvMail(rdvToRemind[i]);
				}
			}
    } catch (err) {
      console.log(err);
    }
  };

  planningPerMonth = async (currentYear, month, staff) => {
    try {
      const firstDayOfMonth = new Date(`${currentYear}-${month}-01`);
      const daysInMonth = moment(firstDayOfMonth).daysInMonth();
      const lastDayOfMonth = new Date(`${currentYear}-${month}-${daysInMonth}`);

      const planned = await RDV.aggregate(planningPerMonthAggregation(firstDayOfMonth, lastDayOfMonth, staff));

      const formattedArray = [];
      const finalArray = [];

      for (let i = 0; i < planned.length; i++) {
        for (let j = planned[i].startHour; j < planned[i].endHour; j++) {
          formattedArray.push({
            hour: j,
            date: moment(new Date(planned[i].date)).format('YYYY-MM-DD'),
            serviceId: planned[i].service._id,
            serviceName: planned[i].service.name,
            customerId: planned[i].customer._id,
            customerName: planned[i].customer.pseudo,
            customerMail: planned[i].customer.email,
            price: planned[i].service.price,
            commission: planned[i].service.commission,
            priceOffer: planned[i].service.priceOffer,
          });
        }
      }

      for (let i = 1; i <= daysInMonth; i++) {
        for (let j = 8; j < 18; j++) {
          finalArray.push({
            date: moment(new Date(`${currentYear}-${month}-${i}`)).format(
              'YYYY-MM-DD'
            ),
            hour: j,
            rdvStatus: formattedArray.some(
              (item) =>
                item.hour === j &&
                item.date ===
                  moment(new Date(`${currentYear}-${month}-${i}`)).format(
                    'YYYY-MM-DD'
                  )
            ),
            ...formattedArray.find(
              (item) =>
                item.hour === j &&
                item.date === moment(new Date(`${currentYear}-${month}-${i}`)).format('YYYY-MM-DD')
            ),
          });
        }
      }

      const groupByDate = finalArray.reduce((group, rdv) => {
        const { date } = rdv;
        group[date] = group[date] ?? [];
        group[date].push(rdv);
        return group;
      }, {});
      
      return groupByDate

    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = RdvService;