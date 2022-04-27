const express = require('express');
const receitasController = require('../controllers/receitasController');

const router = express.Router();

//---------------------------------------------------------------------------------------------------------------//

router.route('/').get(receitasController.sugerirReceitas);

module.exports = router;

//---------------------------------------------------------------------------------------------------------------//
