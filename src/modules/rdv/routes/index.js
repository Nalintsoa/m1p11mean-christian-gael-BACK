const { Router } = require("express");
const RdvController = require("../controller/rdv.controller");

const routes = Router();

const rdvController = new RdvController();

routes.get("/checkDispo", rdvController.checkDispo)
routes.post("/", rdvController.createRDV)

module.exports = routes;