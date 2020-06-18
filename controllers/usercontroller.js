// IMPORTS
const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// TEST GET
router.get('/', (req, res) => {
    res.send('user test route!!');
});

// SIGN UP
router.post('/signup', (req, res) => {
    User.create({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 10) 
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign({id: user.id}, process.env.JWT_PASS, {expiresIn: 60*60*24})
            res.json({
                user: user,
                message: 'user created successfully',
                sessionToken: token
            })
        },
        createError = err => res.send(500, err)
    )
    .catch(err => res.status(500).json({
        error: err
    }))
})



// LOGIN

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
    .then(user => {
        if(user) {
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if(matches) {
                    let token = jwt.sign({id: user.id}, process.env.JWT_PASS, {expiresIn: 60*60*24})
                    res.json({
                        user: user,
                        message: 'log in successful',
                        sessionToken: token
                    })
                } else {
                    res.status(502).send({error: 'password did not match'})
                }
            })
        } else {
            res.status(500).send({error: 'did not find user'})
        }
    }, err => res.status(501).send({error: 'login failed'}))
})

module.exports = router;