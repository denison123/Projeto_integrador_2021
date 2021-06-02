const express = require('express');
const marcasController = require('../controllers/marcas');
const router = express.Router();

router.post('/addmarca', marcasController.add);
router.get('/deletemarca/:id', marcasController.delete);

module.exports = router;  