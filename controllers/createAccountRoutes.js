const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

// create account page
router.get('/', (req, res) => {
    res.render('signup')
});

router.post('/', (req, res) => {
    console.log(req.body);
    User.create(req.body).then(data => {
        res.json(data)

        req.session.user = {
            id: data.id,
            username: data.username,
            email: data.email
        }

    }).catch(err => {
        res.status(500).json({ msg: "ERROR", err })
    });
});

module.exports = router;