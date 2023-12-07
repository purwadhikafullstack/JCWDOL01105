const express = require('express');
const router = express.Router();
const authRouter = require('../routes/authRouter');
const profileRouter = require('../routes/profileRouter');
const tenantRouter = require('../routes/tenantRouter');

router.use('/auth', authRouter);

router.use('/profile', profileRouter);

router.use('/auth', tenantRouter);

module.exports = router;
