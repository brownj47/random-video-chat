const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

const loginRoutes = require('./loginRoutes')
const createAccountRoutes = require('./createAccountRoutes')
const chatRoutes = require('./videoChatRoute')

router.get('/', (req, res) => {
    res.render('landing')
});

router.use("/login",loginRoutes)
router.use("/create-account",createAccountRoutes)
router.use("/videochat",chatRoutes)

module.exports = router;