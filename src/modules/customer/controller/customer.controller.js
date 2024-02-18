const CustomerService = require("../service/customer.service");

class CustomerController {
    constructor(){
        this.customerService = new CustomerService();
    }

    register = (req, res) => {
        console.log(req.body);
    }
}

module.exports = CustomerController;