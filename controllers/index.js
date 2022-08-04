const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('landing')
});


//render main video chat page
router.get('/videochat', (req, res)=>{
    res.render('videochat')
});

// create account page
router.get('/create-account', (req, res)=>{
    res.render('create')
});
router.post('/create-account', (req, res)=>{
    console.log(req.body)
    res.json('post route connected')
});

//login routes
router.get('/login', (req, res)=>{
    res.render('login')
});
router.post('/login', (req, res)=>{
    console.log(req.body)
    res.json('post route connected')
});



module.exports = router;