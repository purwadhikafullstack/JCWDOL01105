const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const tenantMiddleware = require('../middleware/tenantMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadOptionPaymentProof } = require('../utils/uploadFile');
const paymentController = require('../controllers/payment');

router.post('/', authMiddleware, OrderController.createOrder);

router.get('/', authMiddleware, OrderController.getOrder);

router.post(
  '/payment_proof',
  authMiddleware,
  uploadOptionPaymentProof.single('payment_proof'),
  OrderController.payment_proof,
);

router.get(
  '/payment_proof/:order_id',
  tenantMiddleware,
  OrderController.getPaymentProof,
);

router.put(
  '/confirm_payment/:id',
  tenantMiddleware,
  OrderController.confirmPayment,
);

router.put(
  '/reject_payment/:id',
  tenantMiddleware,
  OrderController.rejectPayment,
);

router.put(
  '/cancel_payment/:id',
  tenantMiddleware,
  OrderController.rejectPayment,
);

router.get('/transactions', tenantMiddleware, OrderController.getAllOrders);

router.post('/payment', paymentController.paymentGateway);
router.post('/callback', paymentController.midtransCallback);

router.post(
  '/cancel_order/:order_id',
  authMiddleware,
  OrderController.cancelOrder,
);

module.exports = router;
