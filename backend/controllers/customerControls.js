const customerSchema = require('../models/schema');
require('dotenv').config();
const menuSchema = require('../models/menu');
const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
})
const handleError = (res, error) => {
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

    const checkDup = await customerSchema.findOne({ email: email })
    if (checkDup) {
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
    const desireOrder = req.body;
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
      res.status(404).json({ error: "Customer not found or Table is vacant" });
    }
  } catch (err) {
    handleError(res, err);
  }
};

const previewOrder = async (req, res) => {
  try {
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

const sendMail = async (req, res) => {
  try {
    const table = req.params.id;
    let { food } = req.body;
    const customerData = await customerSchema.findOne({ tableID: table });
    if (customerData) {
      const customerEmail = customerData.email;
      let mailBody = `Food Ordered from Table Id: ${table}\n\n`;
      let totalAmount = 0;

      for (const item of food) {
        const itemTotal = item.quantity * item.price;
        totalAmount += itemTotal;
        mailBody += `${item.name} - Quantity: ${item.quantity}, Price: RS.${item.price}\n`;
      }

      mailBody += `\nTotal Amount: RS. ${totalAmount}\n`;

      let mailOptions = {
        from: process.env.NODEMAILER_FROM_EMAIL,
        to: customerEmail,
        subject: "Food Ordered from Table Id: " + table,
        text: mailBody,
      };

      transporter.sendMail(mailOptions, (error, info));

      res.json({ msg: "Mail Sent Successfully" });
    } else {
      res.status(400).json({ msg: "Error While Sending Mail" });
    }
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
  sendMail
};