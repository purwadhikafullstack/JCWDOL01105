const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');
const { userProfileValidation } = require('../middleware/userValidation');
const { uploadOptionsProfile } = require('../utils/uploadFile');

router.post(
  '/',
  authMiddleware,
  userProfileValidation(),
  profileController.updateOrCreateProfile,
);

router.get('/', authMiddleware, profileController.getProfile);

router.get('/picture', authMiddleware, profileController.getProfilePicture);

router.post(
  '/upload',
  authMiddleware,
  uploadOptionsProfile.single('profilePicture'),
  profileController.uploadProfile,
);

module.exports = router;