const express = require('express');
const receitasController = require('../controllers/receitasController');

const router = express.Router();

//---------------------------------------------------------------------------------------------------------------//

router.route('/').post(receitasController.sugerirReceitas);
router.route('/receita').post(receitasController.getReceita);

module.exports = router;

//---------------------------------------------------------------------------------------------------------------//
