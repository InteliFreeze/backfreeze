const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

//---------------------------------------------------------------------------------------------------------------//

router.route('/').post(userController.createUser);

router.post('/:token/', userController.addItem);

router.delete('/:token/:itemId', userController.deleteItem);

router.route('/:token').get(userController.getUser);

module.exports = router;

//---------------------------------------------------------------------------------------------------------------//
