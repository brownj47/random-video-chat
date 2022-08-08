const express = require('express');
const router = express.Router();
const User = require('../models/userModel.js');
const Room = require('../models/roomModel.js');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid');


router.get('/', async (req, res) => {
    if (!req.session.user) {
        return res.render('login');
    };
    try {
        const data = await Room.findAll({ where: { occupants: 1 } });

        if (data.length ===0) {
            const roomID = uuidv4.v4();
            const response = await Room.create({id: roomID});
            return res.status(200).json(response);
        } else{
            return res.status(200).json(data[0]);
        };

    } catch (err) {
        console.log(err);
    };
});

module.exports = router;