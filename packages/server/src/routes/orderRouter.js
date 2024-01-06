const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');
const tenantMiddleware = require('../middleware/tenantMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { uploadOptionPaymentProof } = require('../utils/uploadFile');
const paymentController = require('../controllers/paymentGatewayController');

// router.post('/', authMiddleware, OrderController.createOrder);

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

router.post(
  '/confirm_payment/:order_id',
  tenantMiddleware,
  OrderController.confirmPayment,
);

router.post('/payment', paymentController.paymentGateway);
router.post('/midtrans/notification', paymentController.trxNotif);

router.post(
  '/cancel_order/:order_id',
  authMiddleware,
  OrderController.cancelOrder,
);

module.exports = router;
