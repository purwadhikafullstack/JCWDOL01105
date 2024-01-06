const express = require('express');
const router = express.Router();
const authRouter = require('./authUserRouter');
const profileRouter = require('../routes/profileRouter');
const tenantRouter = require('./authTenantRouter');
const reviewRouter = require('../routes/reviewRouter');
const OrderRouter = require('./orderRouter');
const salesReportRouter = require('./salesReportRouter');

router.use('/auth', authRouter);

router.use('/profile', profileRouter);

router.use('/auth', tenantRouter);

router.use('/order', OrderRouter);

router.use('/review', reviewRouter);

router.use('/sales-report', salesReportRouter);

module.exports = router;
