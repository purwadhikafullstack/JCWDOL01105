const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authenticate = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/tenantMiddleware');
const tenantMiddleware = require('../middleware/tenantMiddleware');
const { uploadOptionPaymentProof } = require('../utils/uploadFile');
// const paymentController = require('../controllers/paymentGatewayController');
const { paymentGateway, midtransCallback } = require('../controllers/payment');

router.post('/', authenticate, orderController.createOrder);
router.get('/transactions', authMiddleware, orderController.getAllOrders);
router.put(
  '/confirm-payment/:id',
  authMiddleware,
  orderController.confirmPayment,
);

router.get('/transactions', authMiddleware, orderController.getAllOrders);

router.get(
  '/payment_proof/:order_id',
  tenantMiddleware,
  orderController.getPaymentProof,
);

router.post(
  '/confirm_payment/:order_id',
  tenantMiddleware,
  orderController.confirmPayment,
);

router.post('/payment', paymentGateway);
router.post('/callback', midtransCallback);

router.post(
  '/cancel_order/:order_id',
  authMiddleware,
  orderController.rejectPayment,
);

router.put('/cancel-order/:id', authMiddleware, orderController.cancelOrder);
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
