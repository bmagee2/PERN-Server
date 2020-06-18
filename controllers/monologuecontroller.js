// IMPORTS
const router = require('express').Router()
const Monologue = require('../db').import('../models/monologue');

// ENDPOINTS

// GET ALL MONOLOGUES
router.get('/get', (req, res) => {
    Monologue.findAll({
        where: {
            owner_id: req.user.id
        }
    })
        .then(monologues => res.status(200).json({
            monologues: monologues
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
})

// POST NEW MONOLOGUE
router.post('/post', (req, res) => {
    const newMonologue = {
        playTitle: req.body.monologue.playTitle,
        characterName: req.body.monologue.characterName,
        category: req.body.monologue.category,
        genre: req.body.monologue.genre,
        sceneSynopsis: req.body.monologue.sceneSynopsis,
        monologue: req.body.monologue.monologue,
        notes: req.body.monologue.notes,
        owner_id: req.user.id
    }
    Monologue.create(newMonologue)
        .then(monologue => res.status(200).json({
            monologue: monologue
        }))
        .catch(err => res.status(500).json({
            error: err
        }))
})

// GET ONE MONOLOGUE BY PLAY TITLE
router.get('/:title', (req, res) => {
    Monologue.findOne({
        where: {
            playTitle: req.params.title
        }
    })    
    .then(monologue => res.status(200).json({
        monologue: monologue
    }))
    .catch(err => res.status(500).json({
         error: err
    }))
})

// GET ONE MONOLOGUE BY CHARACTER NAME
router.get('/character/:name', (req, res) => {
    Monologue.findOne({
        where: {
            characterName: req.params.name
        }
    })    
    .then(monologue => res.status(200).json({
        monologue: monologue
    }))
    .catch(err => res.status(500).json({
         error: err
    }))
})

// UPDATE A MONOLOGUE
router.put('/:id', (req, res) => {
    Monologue.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(monologue => res.status(200).json({
        monologue: monologue
    }))
    .catch(err => res.status(500).json({
        error: err
    })) 
})


// DELETE A MONOLOGUE
router.delete('/:id', (req, res) => {
    Monologue.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(monologue => res.status(200).json({
        monologue: monologue
    }))
    .catch(err => res.status(500).json({
        error: err
    }))
})

module.exports = router;