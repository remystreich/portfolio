const userRouter = require('express').Router();
const userModel = require('../models/userModel')



//afficher login
userRouter.get('/login', async (req, res) => {
    try {
        res.render('templates/owner/login.twig')
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})


//login
userRouter.post('/login', async (req, res) => {
    try {
        let user = await userModel.findOne({ mail: req.body.mail , password: req.body.password})
        if (user){
            req.session.userId = user._id
            res.redirect('/dashboard')
            
        }else{
            res.status(400)
            res.send("identifiants incorrects")
        }
    }
    catch (error) {
        console.log(error)
        res.send(error)
        console.log(req.body);
    }
})

module.exports = userRouter