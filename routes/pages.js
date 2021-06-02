const express = require('express');
const empresasController = require('../controllers/empresas');
const marcasController = require('../controllers/marcas');
const departamentosController = require('../controllers/departamentos');
const cargosController = require('../controllers/cargos');
const tipoController = require('../controllers/tipo');
const funcionariosController = require('../controllers/funcionarios');
const router = express.Router();

router.get('/register',(req,res)=>{
    res.render('register');
})

router.get('/home',(req,res)=>{    
    res.render('home');
})

router.get('/empresas', empresasController.listaempresas)

router.get('/marcas', marcasController.listamarcas)

router.get('/departamentos', departamentosController.listdepartamentos)

router.get('/cargos', cargosController.listacargos)

router.get('/tipo', tipoController.listatipo)

router.get('/funcionarios', funcionariosController.listafuncionarios)

module.exports = router;