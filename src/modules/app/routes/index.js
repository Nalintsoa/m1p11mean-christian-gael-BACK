const { Router } = require("express");
const service = require("@modules/services/routes");
const staff = require("@modules/staff/routes");
const auth = require("@modules/auth/routes");

const routes = Router();

routes.use("/service", service);
routes.use("/staff", staff);
routes.use("/auth", auth);

module.exports = routes;

