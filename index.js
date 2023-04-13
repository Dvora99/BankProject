const { urlencoded } = require('express');
const express = require('express')
const port = 9999
const app = express();
const passport = require('passport')
const path = require('path')
const session = require('express-session')
const cookie = require('cookie-parser')
const flash = require('connect-flash');
const mongoose = require('mongoose')

const flashConfig = require('./config/flash')
const passportLocal = require('./config/passport-local-stretagy');
const passportLocalCustomer = require('./config/passport-customer-stretagy')

mongoose.connect('mongodb+srv://durveshvora9:RRPaUn6lIgCB8gXs@cluster0.g7zggjj.mongodb.net/ProjectBank').then(()=> {
    console.log('DB Connected')
}).catch ((err)=> {
    if(err)
    {
        console.log(err)
    }
})

app.set('view engine', 'ejs')
app.use(express.static('assets'));
app.use(cookie())
app.use(express.urlencoded())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(session({
    name : 'Bank',
    secret : '123',
    saveUninitialized : false,
    resave : true,
    cookie : {
        maxAge : 10000*1000*100
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.Information)

app.use(flash())
app.use(flashConfig.setFlash)

app.use('/', require('./routes/index'))

app.listen(port, (err) => {
    if(err)
    {
        console.log('Server Is Not Working')
        return false
    }
    console.log('Server Is Running ON', port)
})


