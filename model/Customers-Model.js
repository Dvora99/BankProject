const mongoose = require('mongoose')
const multer = require('multer')
const img = ('/img/CustomerPictures')
const path = require('path')

const CustomerSchema = mongoose.Schema({
    BankNameID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'BankName',
        require : true
    },
    BankBranchID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Bank-Branch',
        require : true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    hobby: {
        type: Array,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    ProfilePicture: {
        type: String,
        require: true
    },
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets' ,img))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

CustomerSchema.statics.uploadPicture = multer({ storage: storage }).single('ProfilePicture')
CustomerSchema.statics.Imgpath = img

const Customer = mongoose.model('Customers-data', CustomerSchema)

module.exports = Customer