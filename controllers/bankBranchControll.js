const BankNameModel = require('../model/Bank-Name-Model')
const BankBranchModel = require('../model/Bank-Branch-Model')

module.exports.BankBranchPage = async (req,res) => {
    let bankname = await BankNameModel.find({})
    if(!bankname)
    {
        console.log('Can Not Find Data')
        return false
    }
    return res.render('EnterBankBranch', {
        BankName : bankname
    })

}

module.exports.insertBankBranchName = async (req,res) => {
    let Branch = await BankBranchModel.create(req.body)

    if(!Branch)
    {
        console.log('Can Not Insert')
        return false
    }
    return res.redirect('back')
}

module.exports.ShowBankBranch = async (req,res) => {
    let Branch = await BankBranchModel.find({}).populate('BankNameID').exec();
    if(!Branch)
    {
        console.log('Can Not Find Data')
        return false
    }
    return res.render('Show-BankBranch', {
        BankBranch : Branch
    })
}