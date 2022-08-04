const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('landing')
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

//chat routes
router.get('/chat', (req, res)=>{
    res.render('chat')
});
router.post('/chat', (req, res)=>{
    console.log(req.body)
    res.json('post route connected')
});


module.exports = router;