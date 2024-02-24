const { Router } = require("express");

const StaffController = require("../controller/staff.controller");
const AuthController = require("../../auth/controller/auth.controller");
const { verifyToken } = require("../../../middlewares/verifyToken");


const router = Router();

const staffController = new StaffController();
const authController = new AuthController();

router.get("/", verifyToken, staffController.getAllStaff);
router.post("/", verifyToken, staffController.createStaff);
router.get("/:id", verifyToken, staffController.getStaff);
router.patch("/", verifyToken, staffController.updateStaff);
router.post("/delete", verifyToken, staffController.deleteStaff);
router.post("/getStaffBySpeciality", staffController.getStaffBySpeciality);

module.exports = router;