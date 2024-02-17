const { Router } = require("express");

const AuthController = require('@modules/auth/controller/auth.controller');

const router = Router();

const authController = new AuthController();

router.post("/staffLogin", authController.staffLogin);
router.post("/staffLogout", authController.staffLogout);

module.exports = router;