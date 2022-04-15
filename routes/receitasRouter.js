const express = require('express');
const receitasController = require('../controllers/receitasController');

const router = express.Router();

//---------------------------------------------------------------------------------------------------------------//

router.route('/:id').get(receitasController.getReceita);

module.exports = router;

//---------------------------------------------------------------------------------------------------------------//
