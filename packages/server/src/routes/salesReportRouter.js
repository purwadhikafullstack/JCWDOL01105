const express = require('express');
const router = express.Router();
const salesReportController = require('../controllers/salesReportController');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.get('/', tenantMiddleware, salesReportController.getOrdersByTenantId);
router.get('/property', tenantMiddleware, salesReportController.getProperty);
router.get('/user', tenantMiddleware, salesReportController.getUserByTenantId);

module.exports = router;
