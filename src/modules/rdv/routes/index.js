const { Router } = require("express");
const RdvController = require("../controller/rdv.controller");
const { verifyToken } = require("../../../middlewares/verifyToken");
const MailController = require("../../mail/controller/mail.controller");

const routes = Router();

const rdvController = new RdvController();
const mailController = new MailController();

routes.post("/", verifyToken, rdvController.createRDV);
routes.get("/checkDispo", verifyToken, rdvController.checkDispo);
routes.get("/getHisto", verifyToken, rdvController.getHistoRDV);
routes.patch("/pay", verifyToken, rdvController.payRdv);
routes.get("/planningPerMonth", verifyToken, rdvController.planningPerMonth);
routes.get("/taskDay", verifyToken, rdvController.taskPerDay);

routes.get("/:id", rdvController.getById);
routes.post("/sendAlertRdvMail", mailController.sendAlertRdvMail);

module.exports = routes;