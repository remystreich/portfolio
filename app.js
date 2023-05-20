const express = require('express');
const mongoose = require("mongoose");
const session = require('express-session')
const projectRouter = require('./routes/projectRouter');
const userRouter = require('./routes/userRouter');
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(express.static("./views/assets"))

app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: true }))
app.use(projectRouter)
app.use('/user', userRouter)

//  app.all('*', (req, res)=> {
// 	 	res.redirect('/')
//  })

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`connecté au port ${process.env.PORT}`);
    }
})

try {
    mongoose.connect(process.env.BDD_URI);
    console.log("connecté a la base");

} catch (error) {
    console.log(error)
}
