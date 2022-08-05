const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')

//render main video chat page
router.get('/', (req, res) => {
    res.render('videochat')
});


module.exports = router;