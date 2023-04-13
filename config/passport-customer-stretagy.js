const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const Customer = require('../model/Customers-Model')

passport.use('customer', new passportLocal({
    usernameField : 'email'
}, async(email,password,done) => {
    const user = await Customer.findOne({email : email})
   
    if(user)
    {
        return done(null,user)
    }
    else{
        console.log('user Not Found')
        return done(null,false)
    }
}))



passport.CheckAuth = (req,res,next) => {
    if(req.isAuthenticated())
    {
        // console.log('123')
        return next();
    }
    // console.log('3')
    return res.redirect('/custmerLogInPage')
}

module.exports = passport