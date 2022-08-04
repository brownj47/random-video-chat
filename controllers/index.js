const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('landing')
});

// create account page
router.get('/create-account', (req, res) => {
    res.render('signup')
});
router.post('/create-account', (req, res) => {
    console.log(req.body);
    User.create(req.body).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({ msg: "ERROR", err })
    });
});

//login routes
router.get('/login', (req, res) => {
    res.render('login');

});
router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const foundUser = await User.findOne(
            {
                where: {
                    email: req.body.email
                }
            }
        )

        if (!foundUser) {
            return res.status(401).json('invalid login credentials')
        }

        if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
            return res.status(401).json('invalid login credentials')
        }

        res.json(foundUser)
    } catch (err) {
        console.log(err)
    }
});

//chat routes
router.get('/chat', (req, res) => {
    res.render('chat')
});
router.post('/chat', (req, res) => {
    console.log(req.body)
    res.json('post route connected')
});


module.exports = router;