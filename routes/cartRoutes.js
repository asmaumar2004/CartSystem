const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const { validateCartItem, handleValidationErrors } = require('../middleware/validateRequest');
const router = express.Router();

// POST /cart: Add a product to the user's cart
router.post('/cart', validateCartItem, handleValidationErrors, async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId, cart: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cartItem = user.cart.find(item => item.productId.equals(productId));
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, quantity });
    }

    await user.save();
    res.status(201).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /cart/:id: Update quantity of a product in the cart
router.put('/cart/:id', validateCartItem, handleValidationErrors, async (req, res) => {
  const { userId, quantity } = req.body;
  const productId = req.params.id;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItem = user.cart.find(item => item.productId.equals(productId));
    if (!cartItem) {
      return res.status(404).json({ message: 'Product not in cart' });
    }

    cartItem.quantity = quantity;
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /cart/:id: Remove a product from the cart
router.delete('/cart/:id', async (req, res) => {
  const { userId } = req.body;
  const productId = req.params.id;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.cart = user.cart.filter(item => !item.productId.equals(productId));
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /cart: Fetch the user's cart
router.get('/cart', async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findOne({ userId }).populate('cart.productId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalPrice = user.cart.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    res.json({ cart: user.cart, totalPrice });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
