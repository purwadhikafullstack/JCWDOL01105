const { Tenants } = require('../models');
const { body, check, validationResult } = require('express-validator');

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      console.log('val', result);
      console.log('req.body', req.body);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      errors: errors.array().map((error) => ({
        msg: error.msg,
        param: error.param,
        location: error.location,
      })),
    });
  };
};

const tenantValidationRegister = () => {
  return validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
      .isEmail()
      .withMessage('Invalid email format')
      .notEmpty()
      .withMessage('Email is required')
      .custom(async (value) => {
        const tenant = await Tenants.findOne({ where: { email: value } });
        if (tenant) {
          throw new Error('Email already in use');
        }
        return true;
      }),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[A-Z]/)
      .withMessage('Password must have at least 1 uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must have at least 1 lowercase letter')
      .matches(/\d/)
      .withMessage('Password must have at least 1 number')
      .notEmpty()
      .withMessage('Password is required'),
    body('phone_number')
      .matches(/^\d{11,12}$/)
      .withMessage('Phone number must be 11 or 12 digits')
      .notEmpty()
      .withMessage('Phone number is required'),
    body('idCard_number')
      .matches(/^\d{16}$/)
      .withMessage('Id card number must be 16 digits')
      .notEmpty()
      .withMessage('Id card number is required'),
  ]);
};

const tenantValidationLogin = () => {
  return validate([
    check('email')
      .isEmail()
      .withMessage('Invalid email format')
      .notEmpty()
      .withMessage('Email is required'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/[A-Z]/)
      .withMessage('Password must have at least 1 uppercase letter')
      .matches(/[a-z]/)
      .withMessage('Password must have at least 1 lowercase letter')
      .matches(/\d/)
      .withMessage('Password must have at least 1 number')
      .notEmpty()
      .withMessage('Password is required'),
  ]);
};

module.exports = {
  tenantValidationRegister,
  tenantValidationLogin,
};
