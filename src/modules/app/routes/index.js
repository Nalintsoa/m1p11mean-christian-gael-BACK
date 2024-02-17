const { Router } = require("express");
const service = require("@modules/services/routes");
const staff = require("@modules/staff/routes");
const upload = require("@modules/upload/routes");
const auth = require("@modules/auth/routes");

const routes = Router();

routes.use("/service", service);
routes.use("/staff", staff);
routes.use("/upload", upload);
routes.use("/auth", auth);

module.exports = routes;

