const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticateUser = require('../middleware/userMiddleware');

router.post('/', authenticateUser, orderController.createOrder);

module.exports = router;
