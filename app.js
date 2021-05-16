const express = require('express');
const path = require('path')
const mysql = require("mysql");
const dotenv = require('dotenv');
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middlewares/auth').verifyJWT

dotenv.config({path: './.env'});

const app = express();



const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'ejs')

//Rotas
app.use('/', require('./routes/index'))
app.use('/pages',verifyJWT, require('./routes/pages'))
app.use('/auth', verifyJWT,require('./routes/auth'))

app.listen(4000, ()=>{
    console.log("Server rodando porta 4000");
});