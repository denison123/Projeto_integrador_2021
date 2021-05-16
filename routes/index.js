const express = require('express');
const controllersIndex = require('../controllers/index');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('login');
})

router.post('/login', controllersIndex.login);

module.exports = router;