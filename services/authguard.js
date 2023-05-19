const userModel = require('../models/userModel')
const session = require('express-session');

let authguard = async(req,res,next) =>{
        let user = await userModel.findById(req.session.userId)
        if(user){
            req.session.owner = true
            next()
        }else{
            req.session.owner = false
            res.redirect('/user/login')
        }
   
}

module.exports = authguard