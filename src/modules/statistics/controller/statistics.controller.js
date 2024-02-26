const StatisticsService = require("../service/statistics.service")

class StatisticsController {

    constructor() {
        this.statisticsService = new StatisticsService();
    }

    statisticEmployee = async (req, res) => {
        const { type, date } = req.query;
        try {
            const response = await this.statisticsService.statisticEmployee(type, date);
            res.status(200).send(response);
        } catch (error) {
            console.log(error)

        }

    }
    statisticBooking = async (req, res) => {
        const { type, date } = req.query;
        try {
            const response = await this.statisticsService.statisticBooking(type, date);
            res.status(200).send({ count: response })
        } catch (error) {
            console.log(error)
            res.status(500).send(error);

        }

    }
    statisticBusiness = async (req, res) => {
        const { type, date } = req.query;
        try {
            const response = await this.statisticsService.statisticBusiness(type, date);
            res.status(200).send({ amount: response })
        } catch (error) {
            console.log(error)
            res.status(500).send(error);

        }

    }

}

module.exports = StatisticsController;