const { Router } = require('express');
const StatisticsController = require('../controller/statistics.controller');

const routes = Router();
const statisticsController = new StatisticsController();
routes.get("/statStaff", statisticsController.statisticEmployee);
routes.get("/statBooking", statisticsController.statisticBooking);
routes.get("/statBusiness", statisticsController.statisticBusiness)

module.exports = routes;
