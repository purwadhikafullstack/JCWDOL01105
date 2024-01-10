const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/tenantMiddleware');

router.post('/', authenticate, orderController.createOrder);
router.get('/transactions', authMiddleware, orderController.getAllOrders);
router.put(
  '/confirm-payment/:id',
  authMiddleware,
  orderController.confirmPayment,
);
router.put(
  '/reject-payment/:id',
  authMiddleware,
  orderController.rejectPayment,
);

router.put('/cancel-order/:id', authMiddleware, orderController.cancelOrder);

module.exports = router;
