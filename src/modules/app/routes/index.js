const { Router } = require("express");
const service = require("@modules/services/routes");
const staff = require("@modules/staff/routes");
const upload = require("@modules/upload/routes");
const auth = require("@modules/auth/routes");
const rdv = require("@modules/rdv/routes");
const customer = require("@modules/customer/routes");
const stats = require("@modules/statistics/routes");


const routes = Router();

routes.use("/service", service);
routes.use("/staff", staff);
routes.use("/upload", upload);
routes.use("/auth", auth);
routes.use("/rdv", rdv);
routes.use("/customer", customer);
routes.use("/stats", stats)

module.exports = routes;

