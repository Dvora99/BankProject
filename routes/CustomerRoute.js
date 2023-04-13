const express = require('express')
const customer = express.Router()
const customerController = require('../controllers/CustomerController')
const Customer = require('../model/Customers-Model')

customer.get('/CustomerPage', customerController.CustomerPage)
customer.post('/insertCustomers',Customer.uploadPicture, customerController.insertCustomers)
customer.get('/ShowCustomer', Customer.uploadPicture ,customerController.ShowCustomer)

module.exports = customer