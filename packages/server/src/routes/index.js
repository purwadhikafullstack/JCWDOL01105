const express = require('express');
const router = express.Router();
const authRouter = require('../routes/authRouter');

router.use('/auth', authRouter);

module.exports = router;
