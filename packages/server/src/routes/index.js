const express = require('express');
const router = express.Router();
const authRouter = require('../routes/authRouter');
const propertyRouter = require('../routes/propertyRouter');

router.use('/auth', authRouter);
router.use('/property', propertyRouter);

module.exports = router;
