const projectRouter = require('express').Router()
const projectsModel = require('../models/projectsModel')
const authguard = require("../services/authguard")
const upload = require('../services/multer')
const fs = require('fs');

//afficher dashboard owner
projectRouter.get('/dashboard', authguard,  async (req, res) => {
    try {
        let project = await projectsModel.find()
        res.render('templates/owner/dashboard.twig', {
            projects: project,
            //user: req.session.owner,
            action: "dashboard",
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

//afficher form creation user
projectRouter.get('/addProject', authguard, async (req, res) => {
    try {
        res.render('templates/owner/createProject.twig'), {
            form: "create",
            action: "dashboard",
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

//créer un nouveau projet
projectRouter.post('/addProject', authguard, upload.single('image'), async (req, res) => {
    try {
        let project = new projectsModel(req.body)
        if (req.file){
            project.image = req.file.filename;
        }
        else{
            project.image = ""
        }
        await project.save()
        res.redirect('/dashboard')
    }
    catch (error) {
        console.log(error)
        res.send(error)
    }
})

//afficher un projet avant de le modifier
projectRouter.get('/updateProject/:id', authguard, async (req, res) => {
    try {
        let project = await projectsModel.findOne({ _id: req.params.id })
        res.render("templates/owner/createProject.twig", {
            project: project,
            form: "update",
            action: "dashboard",
        })
    }
    catch (error) {
        console.log(error)
        res.send(error)
    }
})

//modifier le projet
projectRouter.post('/updateProject/:id', authguard, upload.single('image'), async (req, res) => {
    try {
        let project = await projectsModel.findOne({ _id: req.params.id })
        let update = req.body
        if (req.file){
            if (project.image) {
                // Supprimer le fichier d'image
                fs.unlink(`views/assets/img/uploads/${project.image}`, (err) => {
                    if (err) {
                        console.error('Erreur lors de la suppression du fichier :', err);
                        // Gérer l'erreur de suppression du fichier
                    } else {
                        console.log('Fichier supprimé avec succès');
                    }
                });
            }
            update.image = req.file.filename
        }
        await project.updateOne(update)
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//supprimer un projet
projectRouter.get('/deleteProject/:id', authguard, async (req, res) => {
    try {
        // Récupérer les informations du projet
        let project = await projectsModel.findOne({ _id: req.params.id });

        // Vérifier si le projet a une image associée
        if (project.image) {
            // Supprimer le fichier d'image
            fs.unlink(`views/assets/img/uploads/${project.image}`, (err) => {
                if (err) {
                    console.error('Erreur lors de la suppression du fichier :', err);
                    // Gérer l'erreur de suppression du fichier
                } else {
                    console.log('Fichier supprimé avec succès');
                }
            });
        }
        await projectsModel.deleteOne({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})


module.exports = projectRouter