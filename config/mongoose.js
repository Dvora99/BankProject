const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/Bank-DataBase');

var db = mongoose.connection;

db.once('open', (err) => {
    if(err)
    {
        console.log('DB Is Not Working')
        return false
    }
    console.log('DB Is Working')
})

module.exports = db