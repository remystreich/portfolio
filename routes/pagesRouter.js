const pagesRouter = require('express').Router()

//afficher accueil
pagesRouter.get('/lobby', async (req, res) => {
    try {
        res.render('templates/visitor/lobby.twig', {
            action: "lobby",
        })

    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

module.exports = pagesRouter
