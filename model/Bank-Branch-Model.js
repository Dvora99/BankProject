const mongoose = require('mongoose')

const BankBranchSchema = mongoose.Schema({
    BankNameID: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'BankName',
        require: true
    },
    BankBranch: {
        type: String,
        require: true
    },
    IFSCcode : {
        type : String,
        require : true
    },
    BranchDate : {
        type : String,
        require : true
    }
})

const BankBranch = mongoose.model('Bank-Branch', BankBranchSchema)

module.exports = BankBranch