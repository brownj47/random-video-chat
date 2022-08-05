const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

// create account page
router.get('/', (req, res) => {
    res.render('signup', req.session.user)  
    console.log("Session:",req.session.user)
});

router.post('/', (req, res) => {
    console.log(req.body);
    //add user to database
    User.create(req.body).then(data => {
        req.session.user = { // set session details
            id: data.id,
            username: data.username,
            email: data.email
        }
        res.json(data)

    }).catch(err => {
        res.status(500).json({ msg: "ERROR", err })
    });
});

module.exports = router;