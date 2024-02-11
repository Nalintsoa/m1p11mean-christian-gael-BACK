const { Router } = require("express");
const service = require("@modules/services/routes")

const routes = Router();

routes.use("/service", service);

module.exports = routes;

