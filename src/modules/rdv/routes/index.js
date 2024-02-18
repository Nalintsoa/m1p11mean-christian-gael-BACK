const { Router } = require("express");
const RdvController = require("../controller/rdv.controller");

const routes = Router();

const rdvController = new RdvController();

routes.post("/", rdvController.createRDV);
routes.get("/checkDispo", rdvController.checkDispo);
routes.get("/getHisto", rdvController.getHistoRDV);



module.exports = routes;