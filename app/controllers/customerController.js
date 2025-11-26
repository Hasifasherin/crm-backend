const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
};

exports.getCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
};

exports.getCustomer = async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.json(customer);
};

exports.updateCustomer = async (req, res) => {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

exports.deleteCustomer = async (req, res) => {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
};
