const express = require('express');
const Product = require('../models/Product');
const { validateProduct, handleValidationErrors } = require('../middleware/validateRequest');
const router = express.Router();

// GET /products: Fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /products: Add a new product
router.post('/products', validateProduct, handleValidationErrors, async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const newProduct = new Product({ name, price, description });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
