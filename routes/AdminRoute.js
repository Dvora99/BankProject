const express = require('express')
const Adminroute = express.Router();
const Admin = require('../controllers/AdminControll')
const AdminModel = require('../model/AdminModel')
const passport = require('passport')

// DashBoeard

Adminroute.get('/', passport.CheckAuthentication, Admin.dashboardpage)

// Register

Adminroute.get('/register', Admin.register)
Adminroute.post('/getRegister', Admin.getRegister)

// Login

Adminroute.get('/login', Admin.login)
Adminroute.post('/getlogin', passport.authenticate('local', {failureRedirect : '/admin/login'}) ,Admin.getlogin)

// Change Password

Adminroute.get('/ChangePassPage' ,Admin.ChangePassPage)
Adminroute.post('/ChangePassword',Admin.ChangePassword)

// Forget Password

Adminroute.get('/getforgetemailpage', Admin.getforgetemailpage)
Adminroute.post('/checkemail', Admin.checkemail)
Adminroute.get('/OTPpage',Admin.OTPpage)
Adminroute.post('/checkotp', Admin.checkotp)
Adminroute.get('/forgetNewpass', Admin.forgetNewpass)
Adminroute.post('/forgetchangepass', Admin.forgetchangepass)

// LogOut

Adminroute.get('/logout', Admin.logout)

// Admin CRUD Operation

Adminroute.get('/adminformpage', passport.CheckAuthentication , Admin.adminformpage)
Adminroute.post('/insertAdminInfo', passport.CheckAuthentication , AdminModel.uploadPicture, Admin.insertAdminInfo)
Adminroute.get('/DeleteData/:id', passport.CheckAuthentication , AdminModel.uploadPicture, Admin.DeleteData)
Adminroute.get('/UpdateDataPage/:id', passport.CheckAuthentication , AdminModel.uploadPicture, Admin.UpdateDataPage)
Adminroute.post('/UpdateData', passport.CheckAuthentication , AdminModel.uploadPicture, Admin.UpdateData)

Adminroute.get('/showAdmin', Admin.showAdmin)


module.exports = Adminroute