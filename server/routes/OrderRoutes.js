// routes/OrderRoutes.js
import express from 'express';
import jwt from 'jsonwebtoken';
import Order from '../models/Order.js';
import User from '../models/User.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import stripe from 'stripe';
const stripeInstance = stripe('sk_test_51PCPD7BinNA9kikaIhgvFNFTNXQmgEL1dWBIcownmJSi879Qp1P9zsDWrvpARhQsqFYL9CZuSGwXOPwbyFlLI6C000x7FjB4qx');

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

// Place order API
router.post('/orders', verifyToken, async (req, res) => {
    try {
      const { firstName, lastName, streetAddress, floor, zipCode, city, phoneNumber, email } = req.body;
  
      // Fetch user details
      const user = await User.findById(req.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Fetch cart items for the user
      const cartItems = await Cart.find({ user: req.userId }).populate('product').populate('shade');
  
      if (cartItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty' });
      }
  
      // Calculate total price and update product quantity
      let totalPrice = 0;
      for (const cartItem of cartItems) {
        totalPrice += cartItem.product.price * cartItem.quantity;
  
        // Update product quantity
        const updatedProduct = await Product.findByIdAndUpdate(
          cartItem.product._id,
          { $inc: { quantity: -cartItem.quantity } },
          { new: true }
        );
        if (!updatedProduct) {
          return res.status(500).json({ message: 'Failed to update product quantity' });
        }
      }
  
      // Create new order
      const newOrder = new Order({
        user: req.userId,
        items: cartItems.map(item => ({
          product: item.product._id,
          quantity: item.quantity
        })),
        status: 'pending', // Default status
        address: {
          streetAddress,
          floor,
          zipCode,
          city
        },
        name: {
          firstName,
          lastName
        },
        phoneNumber,
        email,
        createdAt: new Date(),
      });
  
      // Save the order
      await newOrder.save();
  
      // Clear the user's cart
      await Cart.deleteMany({ user: req.userId });
  
      console.log('Order placed:', newOrder);
      res.status(201).json(newOrder);
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

  

// Fetch user orders API
router.get('/orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.userId });
        console.log('User orders fetched:', orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update order status API
router.put('/orders/:orderId/status', verifyToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        console.log('Order status updated:', updatedOrder);
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all orders API for admin
router.get('/orders/all', verifyToken, async (req, res) => {
    try {
        // Verify if the user is an admin
        const user = await User.findById(req.userId);
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized: Only admin can access' });
        }

        const allOrders = await Order.find();
        console.log('All orders fetched:', allOrders);
        res.status(200).json(allOrders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Stripe payment intigration 
router.post('/orders/payment', verifyToken, async (req, res) => {
    try {
        const { address, name, email, phone, cardDetails, totalPrice } = req.body;

        // Construct billing address
        // const billingAddress = {
        //     line1: address.streetAddress, // Assuming streetAddress contains line1
        //     city: address.city,
        //     postal_code: address.zipCode,
        //     state: '', // Optionally provide state if applicable
        //     country: 'US', // Assuming US for country, adjust as needed
        // };

        // Use Stripe SDK to process payment
        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: totalPrice * 100,
            currency: 'usd',
            payment_method: cardDetails.payment_method_id,
            confirm: true,
            receipt_email: email,
            return_url: 'http://localhost:3000', // Add your return URL here

            // billing_details: {
            //     name,
            //     email,
            //     phone,
            //     address: billingAddress,
            // },
        });

        // Check if payment was successful
        if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ message: 'Payment failed' });
        }

        // If payment is successful, proceed to place the order
        // This part of the code is similar to the previous "Place order API" endpoint

        // Return success message and order details
        res.status(200).json({ message: 'Payment successful', order: newOrder });
    } catch (error) {
        console.error('Error processing payment and placing order:', error);
        res.status(500).json({ message: 'Server error' });
    }
});



export default router;
