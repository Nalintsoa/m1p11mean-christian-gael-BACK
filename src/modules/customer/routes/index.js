const { Router } = require("express");
const CustomerController = require("@modules/customer/controller/customer.controller");

const router = Router();
const customerController = new CustomerController();

router.post("/", customerController.register);
router.get("/:id", customerController.getCustomer);
router.post("/login", customerController.customerLogin);
router.post("/logout", customerController.customerLogout);
router.post("/addOrRemoveServiceToPreferences", customerController.addOrRemoveServiceToPreferences);
router.get('/getFavoriteEmployees/:customer', customerController.getFavoriteEmployees);
router.post('/addOrRemoveEmployeeAsFavorite', customerController.addOrRemoveEmployeeAsFavorite);
router.post('/forgetPassword', customerController.forgetPassword);
router.post('/checkTemporaryPassword', customerController.checkTemporaryPassword);
router.post('/updatePassword', customerController.updatePassword);

module.exports = router;