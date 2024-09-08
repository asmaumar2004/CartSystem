const { body, validationResult } = require('express-validator');

const validateProduct = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('description').notEmpty().withMessage('Description is required'),
];

const validateCartItem = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('productId').isMongoId().withMessage('Invalid product ID'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateProduct,
  validateCartItem,
  handleValidationErrors,
};
