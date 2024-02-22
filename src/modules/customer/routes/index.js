const { Router } = require("express");
const CustomerController = require("@modules/customer/controller/customer.controller");

const router = Router();
const customerController = new CustomerController();

router.post("/", customerController.register);
router.get("/:id", customerController.getCustomer);
router.post("/login", customerController.customerLogin);
router.post("/logout", customerController.customerLogout);
router.post("/addOrRemoveServiceToPreferences", customerController.addOrRemoveServiceToPreferences);

module.exports = router;