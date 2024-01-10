const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/create-review', authMiddleware, reviewController.createAndUpdate);

router.get(
  '/average-rating-room/:room_id',
  reviewController.getAverageRatingRoom,
);

router.get(
  '/average-rating-property/:property_id',
  reviewController.getAverageRatingProperty,
);

module.exports = router;
