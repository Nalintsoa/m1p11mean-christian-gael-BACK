const { Router } = require("express");

const ServiceController = require("@modules/services/controller/services.controller")

const router = Router();

const serviceController = new ServiceController();

router.get("/", serviceController.getAllService);
router.post("/", serviceController.createService);
router.get("/one", serviceController.getService);
router.patch("/", serviceController.updateService);
router.delete("/", serviceController.deleteService);

module.exports = router;