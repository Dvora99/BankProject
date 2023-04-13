const express = require('express')
const BankBranch = express.Router()
const BankBranchController = require('../controllers/bankBranchControll')

BankBranch.get('/BankBranchPage', BankBranchController.BankBranchPage)
BankBranch.post('/insertBankBranchName', BankBranchController.insertBankBranchName)
BankBranch.get('/ShowBankBranch', BankBranchController.ShowBankBranch)

module.exports = BankBranch