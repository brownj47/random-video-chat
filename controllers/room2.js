const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')


//render main video chat page
router.get('/', async (req, res) => {
    if (req.session.user){ //only allow access if logged in
        //when a user enters the video chat page SQL querys the db finding the use based on the email
        //rendering the video chat page and also handing in the user object
        res.render('room2', req.session.user)
    } else {
        res.render('landing')
    }
});


module.exports = router;