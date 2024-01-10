const { body, check, validationResult } = require('express-validator');
const { validate } = require('uuid');

const validateRating = () => {
  return validate([
    check('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be between 1 and 5'),
    check('comment')
      .isLength({ max: 255 })
      .withMessage('Comment must be less than 255 characters'),
  ]);
};

module.exports = {
  validateRating,
};
