const express = require('express');
const router = express.Router();
const authRouter = require('../routes/authRouter');
const propertyRouter = require('../routes/propertyRouter');
const profileRouter = require('../routes/profileRouter');
const tenantRouter = require('../routes/tenantRouter');
const orderRouter = require('../routes/orderRouter');

router.use('/auth', authRouter);
router.use('/property', propertyRouter);
router.use('/profile', profileRouter);
router.use('/auth', tenantRouter);
router.use('/orders', orderRouter);

module.exports = router;
