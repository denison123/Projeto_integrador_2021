const express = require('express');
const router = express.Router();

router.get('/register',(req,res)=>{
    res.render('register');
})

router.get('/home',(req,res)=>{    
    res.render('home');
})

router.get('/homeTi', (req,res)=>{
    res.render('homeTi');
})

module.exports = router;