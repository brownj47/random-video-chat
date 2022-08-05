const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('landing')
});


//render main video chat page
router.get('/videochat', (req, res) => {
    res.render('videochat')
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
        req.session.user = {
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email
        }
        return res.status(200).json(foundUser)
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;