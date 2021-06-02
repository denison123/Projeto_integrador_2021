const express = require('express');
const tipoController = require('../controllers/tipo');
const router = express.Router();

router.post('/addfuncionario', tipoController.add);
router.get('/deletefuncionario/:id', tipoController.delete);

module.exports = router;  