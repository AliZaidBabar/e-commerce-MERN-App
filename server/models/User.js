// models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, // Ensure username is unique
    required: true // Username is required
  },
  email: {
    type: String,
    unique: true, // Ensure email is unique
    required: true // Email is required
  },
  password: {
    type: String,
    required: function () {
      return !this.isGuest; // Password is not required for guest users
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'guest' // Default role is guest
  },
  isGuest: {
    type: Boolean,
    default: true // Indicates whether the user is a guest
  },
  isActive: {
    type: Boolean,
    default: true // Active by default for guest users
  }
});

const User = mongoose.model('User', userSchema);

export default User;
