const express = require('express');
const router = express.Router();
const salesReportController = require('../controllers/salesReportController');
const tenantMiddleware = require('../middleware/tenantMiddleware');

router.get('/', tenantMiddleware, salesReportController.getSalesReport);

module.exports = router;
