const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/TenantController');
const { uploadOptionsIdCard } = require('../utils/uploadFile');
const {
  tenantValidationRegister,
  tenantValidationLogin,
} = require('../middleware/tenantValidation');

router.post(
  '/register-tenant',
  uploadOptionsIdCard.single('id_picture'),
  tenantValidationRegister(),
  tenantController.registerTenant,
);

router.post(
  '/login-tenant',
  tenantValidationLogin(),
  tenantController.loginTenant,
);

router.post('/verify-tenant', tenantController.verifyEmailTenant);
router.post('/resend-tenant', tenantController.resendVerificationCodeTenant);
router.post(
  '/request-reset-password-tenant',
  tenantController.requestResetPassword,
);
router.post('/reset-password-tenant', tenantController.resetPassword);

module.exports = router;
