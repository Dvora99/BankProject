const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const Admin = require('../model/AdminModel')
const Customer = require('../model/Customers-Model')
const BankNameModel = require('../model/Bank-Name-Model')
const BankBranchModel = require('../model/Bank-Branch-Model')

passport.use(new passportLocal({
    usernameField : 'email'
}, async (email,password,done) => {
    let data = await Admin.findOne({email : email})
    console.log(data)
    if(!data || data.password != password)
    {
        console.log('Data Not Found')
        return done(null,false)
    }
    else{
        return done(null,data)
    }
}))

passport.serializeUser( (data,done) => {
    // console.log(data);
    
    return done(null,data.id)
})

passport.deserializeUser( async (id,done) => {
   
    let data = await Admin.findById(id)
    
    if(!data)
    {
        let customerData = await Customer.findById(id).populate('BankNameID').populate('BankBranchID').exec()
        // console.log('Data Not Found')
        return done(null,customerData)
    }
    else{

        return done(null,data)
    }
})

passport.CheckAuthentication = (req,res,next) => {
    if(req.isAuthenticated())
    {
        return next()
    }
    return res.redirect('/admin/login')
}

passport.Information = (req,res,next) => {
    res.locals.user = req.user
    next();
}

module.exports = passport