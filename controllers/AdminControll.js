const Admin = require('../model/AdminModel')
const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')


module.exports.dashboardpage = (req,res) => {
    return res.render('dashboard')
}

module.exports.adminformpage = (req,res) => {
    return res.render('Admin-form')
}

module.exports.insertAdminInfo = async (req,res) => {
    req.body.name = req.body.fname + ' ' + req.body.lname
    // req.body.name = name
    
    if(req.file)
    {
        req.body.ProfilePicture = Admin.Imgpath + '/' + req.file.filename
        // req.body.ProfilePicture = Imgpath

        let data = await Admin.create(req.body)

        return res.redirect('back')
    }
    else
    {
        let data = await Admin.create(req.body)

        return res.redirect('back')
    }
}

module.exports.getSearch = (req,res) => {
    // console.log(req.query.search)\
}

module.exports.showAdmin = async (req,res) => {
    // console.log(req.query.search)
    let search = ''
    let page = 1
    let perPage = 3

    if(req.query.search)
    {
        search = req.query.search
    }
    if(req.query.page)
    {
        page = req.query.page
    }

    let Admindata = await Admin.find({
        $or : [
            { name : { $regex : '.*'+ search + '.*'}},
            { email : {$regex : '.*'+ search + '.*'}}
        ]
    }).skip((page - 1)*perPage).limit(perPage)

    let AdminCountdata = await Admin.find({}).countDocuments({
        $or : [
            { name : { $regex : '.*'+ search + '.*'}},
            { email : {$regex : '.*'+ search + '.*'}}
        ]
    })
    let Countdata = Math.ceil(AdminCountdata/perPage)

    return res.render('Show-Admin',{
        Data : Admindata,
        no : Countdata
    })
}

module.exports.DeleteData = async (req,res) => {
    
    // console.log(req.params.id)
    let data = await Admin.findById(req.params.id)
    if(!data.ProfilePicture)
    {
        await Admin.findByIdAndDelete(req.params.id)
        req.flash('success', 'Data Deleted')
        return res.redirect('back')
    }
    else{
        fs.unlinkSync(path.join(__dirname, data.ProfilePicture))
        await Admin.findByIdAndDelete(req.params.id)
        req.flash('success', 'Data Deleted')
        return res.redirect('back')
    }
}

module.exports.UpdateDataPage = async (req,res) => {
    let data = await Admin.findById(req.params.id)

    data.fname = data.name.split(' ')[0]
    data.lname = data.name.split(' ')[1]

    return res.render('UpdateAdmin',{
        Udata : data
    })
}

module.exports.UpdateData = async (req,res) => {
    let id = req.body.id
    let data = await Admin.findById(id)

    // if(!data.ProfilePicture || data.ProfilePicture == 'undefined')
    if(data.ProfilePicture)
    {
        fs.unlinkSync(path.join(__dirname, data.ProfilePicture))

        req.body.ProfilePicture = Admin.Imgpath + '/' + req.file.filename
        req.body.name = req.body.fname + ' ' + req.body.lname

        let UpdateData = await Admin.findByIdAndUpdate(id, req.body)

        if(UpdateData)
        {
            // console.log('Data Updated Successfully')
            return res.redirect('/admin/showAdmin')    
        }
        return res.redirect('back')
    }
    else
    {
        req.body.ProfilePicture = Admin.Imgpath + '/' + req.file.filename
        req.body.name = req.body.fname + ' ' + req.body.lname

        let UpdateData = await Admin.findByIdAndUpdate(id, req.body)

        if(UpdateData)
        {
            // console.log('Data Updated Successfully')
            return res.redirect('/admin/showAdmin')    
        }
        return res.redirect('back')
    }
}

module.exports.register = (req,res) => {
    return res.render('register')
}

module.exports.getRegister = async (req,res) => {
    // console.log(req.body)
    let OldData = await Admin.findOne({email : req.body.email})

    if(OldData)
    {
        console.log('Email Already Register')
        return false
    }
    else
    {
        if(req.body.pass == req.body.cpass)
        {
            let register = await Admin.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.pass,
                hobby : '',
                city : '',
                gender : '',
                ProfilePicture : '',
                description : ''
            })

            if(register)
            {
                console.log('Register Successfully')
                return res.redirect('/admin')
            }
            console.log('Can Not Register Pls.... Try Again !!!')
            return false
        }
        else
        {
            console.log('PassWord And Confirm Password Not Same')
            return false
        }
    }
}

module.exports.login = (req,res) => {
    return res.render('login')
}

module.exports.getlogin = (req,res) => {
    req.flash('success', 'Login SuccessFully')
    return res.redirect('/admin')
}

module.exports.ChangePassPage = (req,res) => {
    return res.render('ChangePassword')
}

module.exports.ChangePassword = async (req,res) => {
    let DBpass = req.user.password
    let oldpass = req.body.oldpass
    let newpass = req.body.newpass
    let Cpass = req.body.Cnewpass

    if(DBpass == oldpass)
    {
        if(oldpass != newpass)
        {
            if(newpass == Cpass)
            {
                let change = await Admin.findByIdAndUpdate(req.user.id, {password : newpass})

                if(change)
                {
                    return res.redirect('/admin/login')
                }
                else{
                    req.flash('error', 'Try Again....!!!!')
                    return res.redirect('back')
                }
            }
            else{
                req.flash('error', 'New And Confirm Pass Not Same')
                return res.redirect('back')
            }
        }
        else{
            req.flash('error', 'Old And New Not Be Same')
            return res.redirect('back')
        }
    }
    else{
        req.flash('error', 'Wrong Old Password')
        return res.redirect('back')
    }
}

module.exports.getforgetemailpage = (req,res) => {
    return res.render('forgetEmailPage')
}

module.exports.checkemail = async(req,res) => {
    let chechmail = await Admin.findOne({email : req.body.email})

    if(chechmail)
    {
        var otp = Math.ceil(Math.random() * 10000)
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "16223aca773828",
              pass: "57fc54d6eb4f23"
            }
        });
        let info = await transport.sendMail({
            from: 'durveshvora9@gmail.com', // sender address
            to: chechmail.email, // list of receivers
            subject: "Request For Forget Password", // Subject line
            text: "Hello world", // plain text body
            html: `<b>Your OTP :</b>${otp}`, // html body
        });
    }
    else{
        req.flash('error', 'Wrong Email')
        return res.redirect('back')
    }
    res.cookie('otp', otp)
    res.cookie('email', req.body.email)
    return res.redirect('/admin/OTPpage')
}

module.exports.OTPpage = (req,res) => {
    return res.render('OTP')
}

module.exports.checkotp = (req,res) => {
    if(req.body.otp == req.cookies.otp)
    {
        return res.redirect('/admin/forgetNewpass')
    }
    else{
        req.flash('error', 'Wrong OTP')
        return res.redirect('back')
    }
}

module.exports.forgetNewpass = (req,res) => {
    return res.render('forgetNewpassPage')
}

module.exports.forgetchangepass = async (req,res) => {
    // console.log(req.body)
    if(req.body.npass == req.body.cpass)
    {
        let checkmail = await Admin.findOne({email : req.cookies.email})
        let id = checkmail.id

        if(checkmail)
        {
            let changepass = await Admin.findByIdAndUpdate(id, {password : req.body.npass})

            if(!changepass)
            {
                req.flash('error', 'Password Not Change')
                return res.redirect('back')
            }
            res.cookie('otp','')
            res.cookie('email','')
            return res.redirect('/admin/login')
        }
        else{
            req.flash('error', 'Something Wrong, Try again... !!')
            return res.redirect('back')
        }
    }
    else{
        req.flash('error', 'Password Not Match')
        return res.redirect('back')
    }
}

module.exports.logout = (req,res) => {
    req.logout((err) => {
        if(err)
        {
            console.log('Can Not LogOut')
            return false
        }
        res.cookie('Bank','')
        return res.redirect('/admin/login')
    })
}