const { Router } = require("express");
const RdvController = require("../controller/rdv.controller");
const { verifyToken } = require("../../../middlewares/verifyToken");

const routes = Router();

const rdvController = new RdvController();

routes.post("/", verifyToken, rdvController.createRDV);
routes.get("/checkDispo", verifyToken, rdvController.checkDispo);
routes.get("/getHisto", verifyToken, rdvController.getHistoRDV);



module.exports = routes;