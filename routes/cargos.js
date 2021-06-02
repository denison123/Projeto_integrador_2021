const express = require('express');
const cargosController = require('../controllers/cargos');
const router = express.Router();

router.post('/addcargo', cargosController.add);
router.get('/deletecargo/:id', cargosController.delete);

module.exports = router;  