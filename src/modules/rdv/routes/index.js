const { Router } = require("express");
const RdvController = require("../controller/rdv.controller");
const { verifyToken } = require("../../../middlewares/verifyToken");

const routes = Router();

const rdvController = new RdvController();

routes.post("/", verifyToken, rdvController.createRDV);
routes.get("/checkDispo", verifyToken, rdvController.checkDispo);
routes.get("/getHisto", verifyToken, rdvController.getHistoRDV);
routes.patch("/pay", verifyToken, rdvController.payRdv);
routes.get("/planningPerMonth", verifyToken, rdvController.planningPerMonth);
routes.get("/taskDay", verifyToken, rdvController.taskPerDay);


module.exports = routes;