const express = require('express')
const bankName = express.Router()
const BankNameController = require('../controllers/bankNameController')

bankName.get('/BankNamePage', BankNameController.BankNamePage)
bankName.post('/insertBankName', BankNameController.insertBankName)
bankName.get('/ShowBankName', BankNameController.ShowBankName)

module.exports = bankName