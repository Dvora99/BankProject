const mongoose = require('mongoose')

const BankNameSchema = mongoose.Schema({
    BankName: {
        type: String,
        require: true
    }
})

const BankName = mongoose.model('BankName', BankNameSchema)

module.exports = BankName