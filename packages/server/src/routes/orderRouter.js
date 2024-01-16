const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const tenantMiddleware = require('../middleware/tenantMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadOptionPaymentProof } = require('../utils/uploadFile');
// const paymentController = require('../controllers/paymentGatewayController');
const { paymentGateway, midtransCallback } = require('../controllers/payment');

router.post('/', authMiddleware, OrderController.createOrder);

router.get('/', authMiddleware, OrderController.getOrder);

router.post(
  '/payment_proof',
  authMiddleware,
  uploadOptionPaymentProof.single('payment_proof'),
  OrderController.payment_proof,
);

router.get('/transactions', authMiddleware, OrderController.getAllOrders);

router.get(
  '/payment_proof/:order_id',
  tenantMiddleware,
  OrderController.getPaymentProof,
);

router.post(
  '/confirm_payment/:order_id',
  tenantMiddleware,
  OrderController.confirmPayment,
);

router.post('/payment', paymentGateway);
router.post('/callback', midtransCallback);

router.post(
  '/cancel_order/:order_id',
  authMiddleware,
  OrderController.cancelOrder,
);

router.put(
  '/confirm-payment/:id',
  authMiddleware,
  OrderController.confirmPayment,
);

router.put(
  '/reject-payment/:id',
  authMiddleware,
  OrderController.rejectPayment,
);

router.put('/cancel-order/:id', authMiddleware, OrderController.cancelOrder);

module.exports = router;
