const express = require('express')
const route = express.Router();
const passport = require('passport')
const Frontend = require('../controllers/front-end-controller')


route.get('/', Frontend.FrontendPage)
route.get('/custmerLogInPage', Frontend.custmerLogInPage)
route.post('/custmerLogIn', passport.authenticate('customer', {failureRedirect : '/custmerLogInPage'}) ,Frontend.custmerLogIn)
route.get('/customerInfo', passport.CheckAuth ,Frontend.customerInfo)
route.get('/logout', Frontend.logout)

route.use('/admin', require('./AdminRoute'))
route.use('/bankname', passport.CheckAuthentication , require('./BankNameRoute'))
route.use('/bankbranch',passport.CheckAuthentication ,require('./BankBranchRoute'))
route.use('/employee' ,passport.CheckAuthentication ,require('./EmployeeRoute'))
route.use('/customer' ,passport.CheckAuthentication ,require('./CustomerRoute'))

module.exports = route