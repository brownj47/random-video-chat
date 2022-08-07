const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

//render main video chat page
router.get('/', async (req, res) => {
    if (req.session.user){ //only allow access if logged in
        //when a user enters the video chat page SQL querys the db finding the use based on the email
        const userData = await User.findOne({
            where: {
              email: req.session.user.email
            },
          });
        if(!userData) {
            res.status(404).json({message: 'No User with this id!'});
            return;
        }
        //serialize data
        const user = userData.get({ plain: true });
        //rendering the video chat page and also handing in the user object
        res.render('videochat', user)
    } else {
        res.render('landing')
    }
});


module.exports = router;