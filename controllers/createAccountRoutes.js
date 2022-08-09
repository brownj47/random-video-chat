const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')

// create account page
router.get('/', (req, res) => {
    //prevent access and render videochat page if logged in
    if (!req.session.user) {
        res.render('signup');
    } else {
        res.render('random');
    };
});


//route to create account
router.post('/', (req, res) => {
    console.log(req.body);
    //add user to database
    User.create(req.body).then(data => {

        // set session details
        req.session.user = {
            id: data.id,
            username: data.username,
            email: data.email
        };

        res.json(data);

    }).catch(err => {
        res.status(500).json({ msg: "ERROR", err });
    });
});

module.exports = router;