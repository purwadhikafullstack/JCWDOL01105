const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { uploadOptionsProperty } = require('../utils/uploadFile');

router.post(
  '/upload',
  uploadOptionsProperty.single('propertyPicture'),
  propertyController.createOrUpdateProperty,
);

router.get('/properties', propertyController.getProperties);
router.get('/search', propertyController.searchProperties);
router.delete('/delete/:id', propertyController.deleteProperty);
router.put('/property/:id', propertyController.createOrUpdateProperty);

module.exports = router;
