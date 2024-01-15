const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { uploadOptionsProperty } = require('../utils/uploadFile');
const authenticateTenant = require('../middleware/tenantMiddleware');

router.get('/properties', propertyController.getProperties);
router.get(
  '/property',
  authenticateTenant,
  propertyController.getPropertiesTenant,
);

router.get('/search', propertyController.searchProperties);
router.get('/:id', propertyController.getProperty);

router.delete(
  '/delete/:id',
  authenticateTenant,
  propertyController.deleteProperty,
);

router.post(
  '/upload',
  authenticateTenant,
  uploadOptionsProperty,
  propertyController.createOrUpdateProperty,
);

router.put(
  '/:id',
  authenticateTenant,
  propertyController.createOrUpdateProperty,
);
module.exports = router;
