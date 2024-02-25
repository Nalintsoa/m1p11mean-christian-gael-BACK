const moment = require("moment");
const RDV = require("../../../schema/rdv");
const Staff = require("../../../schema/staff");
const MailService = require("../../mail/service/mail.service");

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
}

module.exports = RdvService;