const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    mail :{
        type : String,
    },
    password : {
        type : String,
    }
})

const userModel = mongoose.model("owners", userShema);
module.exports= userModel