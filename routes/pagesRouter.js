const pagesRouter = require('express').Router()
const contactModel = require('../models/contactModel')
const transporter = require('../services/nodemailer')

//afficher accueil
pagesRouter.get('/', async (req, res) => {
    try {
        res.render('templates/visitor/lobby.twig', {
            action: "lobby",
        })

    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

//afficher à propos
pagesRouter.get('/about', async (req, res) => {
    try {
        res.render('templates/visitor/about.twig', {
            action: "about",
        })

    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

//afficher accueil
pagesRouter.get('/contact', async (req, res) => {
    try {
        res.render('templates/visitor/contact.twig', {
            action: "contact",
        })

    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

//formulaire de contact
pagesRouter.post('/contact', async (req, res) => {
    try {
        let mail = {  
            from: 'remystreich@gmail.com',  
            to: 'remystreich@gmail.com',  
            subject: 'Portfolio',  
            text: req.body
          };
          console.log(mail);
        transporter.sendMail(mail)
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

module.exports = pagesRouter
