// routes/CartRoutes.js

import express from 'express';
import jwt from 'jsonwebtoken';
import Cart from '../models/Cart.js';

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// CRUD APIs for cart

// Create a cart item
router.post('/cart', verifyToken, async (req, res) => {
  try {
    const { productId, shadeId, selectedWeight, quantity } = req.body;
    
    // Ensure quantity is parsed as a number
    const parsedQuantity = parseInt(quantity);

    // Ensure selectedWeight is provided
    if (!selectedWeight) {
      return res.status(400).json({ message: 'Selected weight is required' });
    }

    // Check if a cart item with the same product id already exists for the user
    const existingCartItem = await Cart.findOne({ user: req.userId, product: productId });

    if (existingCartItem) {
      // If the cart item exists, update its quantity
      existingCartItem.quantity += parsedQuantity;
      await existingCartItem.save();
      
      console.log('Cart item quantity updated:', existingCartItem);
      res.status(200).json(existingCartItem);
    } else {
      // If the cart item doesn't exist, create a new one
      const newCartItem = new Cart({
        user: req.userId,
        product: productId,
        shade: shadeId,
        selectedWeight, // Include selected weight
        quantity: parsedQuantity // Use parsed quantity
      });

      await newCartItem.save();

      console.log('Cart item added:', newCartItem);
      res.status(201).json(newCartItem);
    }
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read all cart items for a user
router.get('/cart', verifyToken, async (req, res) => {
  try {
    const cartItems = await Cart.find({ user: req.userId }).populate('product').populate('shade');
    console.log('Cart items fetched:', cartItems);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a cart item quantity
router.put('/cart/:cartItemId', verifyToken, async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const updatedCartItem = await Cart.findByIdAndUpdate(cartItemId, { quantity }, { new: true });

    if (!updatedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    console.log('Cart item quantity updated:', updatedCartItem);
    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a cart item
router.delete('/cart/:cartItemId', verifyToken, async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const deletedCartItem = await Cart.findByIdAndDelete(cartItemId);

    if (!deletedCartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    console.log('Cart item deleted:', deletedCartItem);
    res.status(200).json(deletedCartItem);
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear the entire cart for a user
router.delete('/cart', verifyToken, async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.userId });

    console.log('Cart cleared for user:', req.userId);
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
