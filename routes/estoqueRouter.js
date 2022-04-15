const express = require('express');
const estoqueController = require('../controllers/estoqueController');

const router = express.Router();

//---------------------------------------------------------------------------------------------------------------//

router
  .route('/')
  .post(estoqueController.createItem)
  .patch(estoqueController.editItem);

router.route('/:id/:id2').get(estoqueController.getItems);

module.exports = router;

//---------------------------------------------------------------------------------------------------------------//
