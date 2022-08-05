const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

//import other routes
const loginRoutes = require('./loginRoutes')
const createAccountRoutes = require('./createAccountRoutes')
const chatRoutes = require('./videoChatRoute')

//Logout route
// router.get('/logout', (req, res) => {
//     // req.session.destroy();
//     res.json({msg:"logged out!"})
// });
router.get('/', (req, res) => {
    if (!req.session.user){
        res.render('landing')
    } else {
        res.render('videochat')
    }
});
router.post('/test', (req, res) => {
    if (req.session.user){
        return res.json({msg: "logged in"})
    } else {
        return res.json({msg: "logged out"})
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ msg: "logged out!" })
})



//use other routes
router.use("/login", loginRoutes)
router.use("/create-account", createAccountRoutes)
router.use("/videochat", chatRoutes)

module.exports = router;