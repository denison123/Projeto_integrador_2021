const express = require('express');
const path = require('path')
const mysql = require("mysql");
const dotenv = require('dotenv');
const ejs = require('ejs')
const cookieParser = require('cookie-parser')
const verifyJWT = require('./middlewares/auth').verifyJWT

dotenv.config({path: './.env'});

const app = express();

app.use(express.urlencoded({extended: false}))
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'ejs')

//Rotas
app.use('/', require('./routes/index'))
app.use('/pages',verifyJWT, require('./routes/pages'))
app.use('/auth', verifyJWT,require('./routes/auth'))
app.use('/empresas', verifyJWT,require('./routes/empresas'))
app.use('/marcas', verifyJWT,require('./routes/marcas'))
app.use('/departamentos', verifyJWT,require('./routes/departamentos'))
app.use('/cargos', verifyJWT,require('./routes/cargos'))
app.use('/tipo', verifyJWT,require('./routes/tipo'))
app.use('/funcionarios', verifyJWT,require('./routes/funcionarios'))

app.listen(4000, ()=>{
    console.log("Server rodando porta 4000");
});