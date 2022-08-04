const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('landing')
});
router.get('/create-account', (req, res)=>{
    res.render('create')
});
router.get('/login', (req, res)=>{
    res.render('login')
});


module.exports = router;