const express = require('express');
const empresasController = require('../controllers/empresas');
const router = express.Router();

router.post('/addempresa', empresasController.add);
router.post('/editempresa', empresasController.edit);
router.get('/deleteempresa/:id', empresasController.delete);

module.exports = router;  