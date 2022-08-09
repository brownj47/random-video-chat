const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel.js');
const uuidv4 = require('uuid');


router.get('/', async (req, res) => {
    //prevent access if not logged in
    if (!req.session.user) {
        return res.render('login');
    };

    try {
        //query database for all rooms with occupancy of one or fewer
        const data = await Room.findAll({ where: { occupants: 1 } });
        //if there are no rooms returned, make one, otherwise, fill up a slot and join the room
        if (data.length === 0) {
            const roomID = uuidv4.v4();
            const response = await Room.create({ id: roomID });
            return res.status(200).json(response);
        } else {
            Room.update({ occupants: 2 }, { where: { id: data[0].id } });
            return res.status(200).json(data[0]);
        };

    } catch (err) {
        console.log(err);
    };
});

//get all rooms
router.get('/all', async (req, res) => {
    //prevent access if logged out
    if (!req.session.user) {
        return res.render('login');
    };
    try {
        const data = await Room.findAll();
        return res.status(200).json(data)

    } catch (err) {
        console.log(err);
    };
});

//render the random template if in any room following the pattern /random/chat/... 
router.get('/chat/:id', async (req, res) => {
    //prevent access if logged out
    if (!req.session.user) {
        return res.render('login');
    };
    try {
        return res.render('random', req.session.user);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;