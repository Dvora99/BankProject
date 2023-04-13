const Bankname = require('../model/Bank-Name-Model')
const bankBranch = require('../model/Bank-Branch-Model')
const Employee = require('../model/Employee-Model')
const Customers = require('../model/Customers-Model')

module.exports.CustomerPage = async (req,res) => {
    var BN = await Bankname.find({})

    return res.render('EnterCustomers', {
        name : BN
    })
}

module.exports.insertCustomers = async(req,res) => {
    req.body.name = req.body.fname + ' ' + req.body.lname
    
    if(req.file)
    {
        req.body.ProfilePicture = Customers.Imgpath + '/' + req.file.filename
        // req.body.ProfilePicture = Imgpath

        let data = await Customers.create(req.body)

        return res.redirect('back')
    }
    else
    {
        let data = await Customers.create(req.body)

        return res.redirect('back')
    }
}

module.exports.ShowCustomer = async (req,res) => {
    let Customerdata = await Customers.find({}).populate('BankNameID').populate('BankBranchID').exec()

    return res.render('Show-Customers',{
        Data : Customerdata
    })
}

module.exports.getbranchname = async (req,res) => {
    let branch = await bankBranch.find({BankNameID : req.body.Branch})
    
    return res.render('option', {
        branchname : branch
    })
}