const Bankname = require('../model/Bank-Name-Model')
const Employee = require('../model/Employee-Model')
const bankBranch = require('../model/Bank-Branch-Model')

module.exports.EmployeePage = async (req,res) => {
    var BN = await Bankname.find({})

    return res.render('EnterEmployee', {
        name : BN
    })
}

module.exports.insertEmployee = async (req,res) => {
    req.body.name = req.body.fname + ' ' + req.body.lname
    if(req.file)
    {
        req.body.ProfilePicture = Employee.Imgpath + '/' + req.file.filename
        // req.body.ProfilePicture = Imgpath

        let data = await Employee.create(req.body)

        return res.redirect('back')
    }
    else
    {
        let data = await Employee.create(req.body)

        return res.redirect('back')
    }
}

module.exports.ShowEmployee = async (req,res) => {
    let Employeedata = await Employee.find({}).populate('BankNameID').populate('BankBranchID').exec()

    return res.render('Show-Employee',{
        Data : Employeedata
    })
}

module.exports.getbranchname = async (req,res) => {
    let branch = await bankBranch.find({BankNameID : req.body.Branch})
    
    return res.render('option', {
        branchname : branch
    })
}