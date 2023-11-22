const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');
require('../utils/passport-setup');
const {
  userValidationRegister,
  userValidationLogin,
} = require('../middleware/userValidation');

const validateRegister = userValidationRegister();
const validateLogin = userValidationLogin();

router.post('/register', validateRegister, authController.registerUser);
router.post('/login', validateLogin, authController.loginUser);
router.post('/verify', authController.verifyEmailUser);
router.post('/resend', authController.resendVerificationCodeUSer);

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000/');
  },
);

module.exports = router;
