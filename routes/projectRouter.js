const projectRouter = require('express').Router()
const { log } = require('console');
const projectsModel = require('../models/projectsModel')
const authguard = require("../services/authguard")
const upload = require('../services/multer')
const fs = require('fs');

//afficher dashboard owner
projectRouter.get('/dashboard', authguard,  async (req, res) => {
    try {
        let project = await projectsModel.find()
        res.render('templates/owner/dashboard.twig', {
            projects: project,       //envoie la liste de projet de la bdd au front
            user: req.session.owner, //conditionne l'apparition du dashboard dans la nav
            action: "dashboard",     //surbrillance de l'onglet
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
            user: req.session.owner,           
            action: "dashboard",            //surbrillance de l'onglet
        }
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

//créer un nouveau projet
projectRouter.post('/addProject', authguard, upload.single('image'), async (req, res) => {  //enregistrement d'une image avec multer avec upload.single(une seule image) et entre paranthese le name de l'input 
    try {
        let project = new projectsModel(req.body)   //nouvel objet "project" constitué du form de la requete
        if (req.file){                              //si il y'a une image dans la requete
            project.image = req.file.filename;      //ajout du nom de l'image à l'objet project
        }
        else{
            project.image = ""                      //sinon nom vide
        }
        await project.save()                        //enregistrement en bdd du project
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
            project: project,                       //récupérer le projet par rapport à l'id envoyé en requete
            action: "dashboard",                    //surbrillance de l'onglet
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
        let project = await projectsModel.findOne({ _id: req.params.id })        //creation de l'objet project à partir de l'elem trouvé en bdd par rapport à son id
        let update = req.body                                                     // creation de l'objet update avec les elm du form de la requete
        if (req.file){                                                            // si une image est en requete
            if (project.image) {                                                  //si une image est déja en bdd
                fs.unlink(`views/assets/img/uploads/${project.image}`);           // Supprimer le fichier d'image
            }
            update.image = req.file.filename                                      //ajout du nom de l'image à l'objet update
        }
        await project.updateOne(update)                                           //maj de project par rapport à update
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

//supprimer un projet
projectRouter.get('/deleteProject/:id', authguard, async (req, res) => {
    try {
        let project = await projectsModel.findOne({ _id: req.params.id });         // Récupérer les informations du projetno
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

//afficher page projects
projectRouter.get('/projects',  async (req, res) => {
    try {
        let project = await projectsModel.find()
        // Tri des produits par date croissante
        let croissantProjects = project.sort((a, b) => new Date(a.date) - new Date(b.date));
        // Tri des produits par date décroissante
        let decroissantProjects = project.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.render('templates/visitor/projects.twig', {
            user: req.session.owner,
            projects: croissantProjects,       //envoie la liste de projet de la bdd au front
            action: "projects",     //surbrillance de l'onglet
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})


module.exports = projectRouter