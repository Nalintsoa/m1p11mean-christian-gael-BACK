const { Router } = require("express");
const CustomerController = require("../controller/customer.controller");

const router = Router();

const customerController = new CustomerController();

module.exports = router;