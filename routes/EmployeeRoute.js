const express = require('express')
const employee = express.Router()
const employeController = require('../controllers/EmployeeController')
const Employee = require('../model/Employee-Model')

employee.get('/EmployeePage', employeController.EmployeePage)
employee.post('/insertEmployee', Employee.uploadPicture ,employeController.insertEmployee)
employee.get('/ShowEmployee', Employee.uploadPicture , employeController.ShowEmployee)
employee.post('/getbranchname', employeController.getbranchname)

module.exports = employee