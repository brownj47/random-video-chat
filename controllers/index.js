const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

//import other routes
const loginRoutes = require('./loginRoutes')
const createAccountRoutes = require('./createAccountRoutes')
const chatRoutes = require('./videoChatRoute')
const room1 = require('./room1')
const room2 = require('./room2')
const room3 = require('./room3')
const random = require('./randomRoute')

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

router.get("/readsession",(req,res)=>{
    res.json(req.session)
})



//use other routes
router.use("/login", loginRoutes)
router.use("/create-account", createAccountRoutes)
router.use("/videochat", chatRoutes)
router.use("/room1", room1)
router.use("/room2", room2)
router.use("/room3", room3)
router.use("/random", random)

module.exports = router;