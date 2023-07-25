const customerSchema = require('../models/schema');
const menuSchema = require('../models/menu');

const handleError = (res, error) => {
  console.log("Error:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

const homePostCustomerDetails = async (req, res) => {
  try {
    const { name, email, mobile } = req.body;
    const table = req.params.id;
    const customer = new customerSchema({
      tableID: table,
      name: name,
      email: email,
      mobile: mobile,
      desireOrder: []
    });
    const checkedup=await customerSchema.findOne({email:email})
    if (checkedup) {
      return res.json()
      
    }
    await customer.save();
    res.json({ msg: 'Thank You sir/Madam, Now choose your menu' });
  } catch (err) {
    handleError(res, err);
  }
};

const getMenu = async (req, res) => {
  try {
    const menu = await menuSchema.find({});
    res.json(menu);
  } catch (err) {
    handleError(res, err);
  }
};

const placeOrderFromMenu = async (req, res) => {
  try {
    const table = req.params.id;
    console.log("Table ID", table);
    const desireOrder = req.body;
    console.log("Desire Order", desireOrder);
    const customer = await customerSchema.findOne({ tableID: table });
    customer.desireOrder = []
    if (customer) {
      desireOrder.forEach(order => {
        customer.desireOrder.push(order);
      });
      await customer.save();
      res.json({
        msg: 'Order placed successfully',
        customer: customer
      });
    } else {
      console.log("Customer with this table number not found or Table is vacant");
      res.status(404).json({ error: "Customer not found or Table is vacant" });
    }
  } catch (err) {
    handleError(res, err);
  } 
};

const previewOrder = async (req, res) => {
  try {
    console.log("Table ID", req.params.id);
    const table = req.params.id;
    const customer = await customerSchema.findOne({ tableID: table });
    if (customer)
      res.json(customer);
    else
      res.json({ msg: 'Table ' + table + ' is vacant' });
  } catch (err) {
    handleError(res, err);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    console.log("Table ID", req.params.id);
    const table = req.params.id;
    const customer = await customerSchema.findOneAndDelete({ tableID: table });
    if (customer)
      res.json({ msg: 'Customer deleted successfully' });
    else
      res.json({ msg: 'Table ' + table + ' is vacant' });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = {
  homePostCustomerDetails,
  getMenu,
  placeOrderFromMenu,
  previewOrder,
  deleteCustomer,
};
