const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')

// create account page
router.get('/', (req, res) => {

    if (!req.session.user){
        res.render('signup')  
    } else {
        res.render('random')
    }
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