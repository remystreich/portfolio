const projectRouter =  require('express').Router()
const projectsModel = require('../models/projectsModel')
const authguard = require("../services/authguard")

//afficher dashboard owner
projectRouter.get('/dashboard', authguard, async (req, res) => {
    try {
        let project = await projectsModel.find()
        res.render('templates/owner/dashboard.twig',{
            projects: project
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//afficher form creation user
projectRouter.get('/addProject', async (req, res) => {
    try {
        res.render('templates/owner/createProject.twig')
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

//créer un nouveau projet
projectRouter.post('/addProject', async (req, res) => {
    try {
        let project = new projectsModel(req.body)
        await project.save()

    }
    catch (error) {
        console.log(error)
        res.send(error)
    }
})

//afficher un projet avant de le modifier
projectRouter.get('/updateProject/:id', async (req, res) => {
    try {
        let project = await projectsModel.findOne({ _id: req.params.id })
        res.render("templates/owner/update.twig",{
            project: project
        })
    }
    catch (error) {
        console.log(error)
        res.send(error)
    }
})

//modifier le projet
projectRouter.post('/updateProject/:id', async (req, res) => {  
    try {
        let project = await projectsModel.updateOne({ _id: req.params.id }, req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//supprimer un projet
projectRouter.get('/deleteProject/:id', async (req, res) =>{
    try {
        await projectsModel.deleteOne({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})



module.exports = projectRouter