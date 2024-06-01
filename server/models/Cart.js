// models/Cart.js

import mongoose from 'mongoose';

const selectedWeightSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

// Modify the cart schema to include the selected weight
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference the Product model
    required: true
  },
  shade: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference the Product model
    // required: true
  },
  selectedWeight: {
    type: selectedWeightSchema, // Use the sub-schema
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
