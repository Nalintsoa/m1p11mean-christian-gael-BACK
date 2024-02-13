const { Router } = require("express");

const StaffController = require("../controller/staff.controller");

const router = Router();

const staffController = new StaffController();

router.get("/", staffController.getAllStaff);
router.post("/", staffController.createStaff);
// router.get("/one", serviceController.getService);
router.patch("/", staffController.updateStaff);
router.post("/delete", staffController.deleteStaff);

module.exports = router;