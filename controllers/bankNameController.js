const BankNameModel = require('../model/Bank-Name-Model')

module.exports.BankNamePage = (req,res) => {
    return res.render('EnterBankName')
}

module.exports.insertBankName = async (req,res) => {
    // console.log(req.body)
    let bankname = await BankNameModel.create(req.body)

    if(!bankname)
    {
        console.log('Data Not Inserted')
        return false
    }
    return res.redirect('back')
}

module.exports.ShowBankName = async (req,res) => {
    let bankname = await BankNameModel.find({})

    if(!bankname)
    {
        console.log('Data Can Not Fine')
        return false
    }
    return res.render('Show-BankNames', {
        BankData : bankname
    })
}