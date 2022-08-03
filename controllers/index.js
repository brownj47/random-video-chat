const express = require('express');
const router = express.Router();
const apiRoutes = require("./api")

router.get('/',(req,res)=>{
    res.render("home")
})

router.get("/login",(req,res)=>{
    res.render("login")
})

router.get("/secretclub",(req,res)=>{
    if(!req.session.user){
        res.redirect("/login")
    }
    res.render("club",req.session.user)
})

router.get("/readsession",(req,res)=>{
    res.json(req.session)
})

router.get("/addcounter",(req,res)=>{
    if(req.session.counter){
        req.session.counter++
    } else {
        req.session.counter=1
    }
    res.send("req.session updated")
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.json({msg:"logged out!"})
})

router.use("/api",apiRoutes)

module.exports = router;