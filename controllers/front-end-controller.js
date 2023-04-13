const CustomerModel = require('../model/Customers-Model')

module.exports.FrontendPage = (req,res) => {
    return res.render('front-End')
}

module.exports.custmerLogInPage = (req,res) => {
    return res.render('CustomerLoginPage')
}

module.exports.custmerLogIn = (req,res) => {
    // console.log(req.body)
    return res.redirect('/customerInfo')
}

module.exports.customerInfo = async (req,res) => {
    return res.render('CustomerInfo')
}

module.exports.logout = (req,res) => {
    req.logout((err) => {
        if(err)
        {
            console.log(err)
            return false
        }
        return res.redirect('/')
    })
}