const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js')
const bcrypt = require('bcrypt')


router.get('/', (req, res) => {
    if (!req.session.user){
        return res.render('login')  
    } else {
        return res.render('videochat')
    }

});
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const foundUser = await User.findOne(
            {
                where: {
                    email: req.body.email
                }
            }
        )
        res.render
        if (!foundUser) {
            return res.status(401).json('invalid login credentials')
        }
        if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
            return res.status(401).json('invalid login credentials')
        }
        req.session.user = {
            id: foundUser.id,
            username: foundUser.username,
            email: foundUser.email
        }
        return res.status(200).json(foundUser)
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;