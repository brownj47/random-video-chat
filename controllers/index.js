const express = require('express');
const router = express.Router();


//import other routes
const loginRoutes = require('./loginRoutes');
const createAccountRoutes = require('./createAccountRoutes');
const random = require('./randomRoute');

// home page gets videochat
router.get('/', (req, res) => {
    //prevent access and render videochat page if logged in
    if (!req.session.user) {
        res.render('landing');
    } else {
        res.render('random');
    };
});

//route to see if you are logged in
router.post('/test', (req, res) => {
    if (req.session.user) {
        return res.json({ msg: "logged in" });
    } else {
        return res.json({ msg: "logged out" });
    };
});

//logout route
router.post("/logout", (req, res) => {
    req.session.destroy();
    res.json({ msg: "logged out!" });
});

//route to access session data
router.get("/readsession", (req, res) => {
    res.json(req.session);
});



//use other routes
router.use("/login", loginRoutes);
router.use("/create-account", createAccountRoutes);
router.use("/random", random);

module.exports = router;