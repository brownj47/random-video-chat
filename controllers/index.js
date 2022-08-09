const express = require('express');
const router = express.Router();


//import other routes
const loginRoutes = require('./loginRoutes')
const createAccountRoutes = require('./createAccountRoutes')

const random = require('./randomRoute')


router.get('/', (req, res) => {
    if (!req.session.user){
        res.render('landing')
    } else {
        res.render('random')
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
router.use("/random", random)

module.exports = router;