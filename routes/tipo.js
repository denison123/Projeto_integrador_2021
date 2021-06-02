const express = require('express');
const tipoController = require('../controllers/tipo');
const router = express.Router();

router.post('/addtipo', tipoController.add);
router.get('/deletetipo/:id', tipoController.delete);

module.exports = router;  