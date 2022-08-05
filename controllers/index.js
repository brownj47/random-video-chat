const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

//import other routes
const loginRoutes = require('./loginRoutes')
const createAccountRoutes = require('./createAccountRoutes')
const chatRoutes = require('./videoChatRoute')

//Home page route
router.get('/', (req, res) => {
    res.render('landing')
});

//use other routes
router.use("/login",loginRoutes)
router.use("/create-account",createAccountRoutes)
router.use("/videochat",chatRoutes)

module.exports = router;