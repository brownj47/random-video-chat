const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

//render main video chat page
router.get('/', (req, res) => {
    if (req.session.user){ //only allow access if logged in
        res.render('videochat')
    } else {
        res.render('landing')
    }
});


module.exports = router;