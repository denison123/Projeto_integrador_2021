const express = require('express');
const departamentosController = require('../controllers/departamentos');
const router = express.Router();

router.post('/adddepartamento', departamentosController.add);
router.get('/deletedepartamento/:id', departamentosController.delete);

module.exports = router;  