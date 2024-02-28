const { Router } = require("express");

const ServiceController = require("@modules/services/controller/services.controller");
const { verifyToken } = require("../../../middlewares/verifyToken");

const router = Router();

const serviceController = new ServiceController();

router.get("/", verifyToken, serviceController.getAllService);
router.post("/", verifyToken, serviceController.createService);
router.get("/one/:id", verifyToken, serviceController.getService);
router.patch("/", verifyToken, serviceController.updateService);
router.post("/delete", verifyToken, serviceController.deleteService);
router.get("/notifOffre", verifyToken, serviceController.getNotifications)

module.exports = router;