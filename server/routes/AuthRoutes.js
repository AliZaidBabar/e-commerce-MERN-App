// routes/AuthRoutes.js

import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import User from '../models/User.js';

const router = express.Router();

// Sign-up API with email verification
// router.post('/signup', async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     // Check if user with the provided email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       role: role === 'admin' ? 'admin' : 'user', // Set role based on input
//       isGuest: false, // User is not a guest
//       isActive: false // User is not yet active until email verification
//     });

//     // Save the user to the database
//     await newUser.save();

//     // Send email verification
//     const verificationToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASSWORD
//       }
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Email Verification',
//       html: `<p>Click <a href="http://localhost:8000/api/auth/verify-email/${verificationToken}">here</a> to verify your email.</p>`
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Error sending verification email:', error);
//         return res.status(500).json({ message: 'Error sending verification email' });
//       } else {
//         console.log('Verification email sent to:', email);
//         return res.status(201).json({ message: 'Verification email sent. Please verify your email to activate your account.' });
//       }
//     });
//   } catch (error) {
//     console.error('Error signing up user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post('/verify-email/:token', async (req, res) => {
  const token = req.params.token;
  if (!token) {
    return res.status(400).json({ message: 'Verification token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find the user by userId and update isActive to true
    await User.findByIdAndUpdate(userId, { isActive: true });

    // Redirect URL after successful verification
    return res.redirect('http://localhost:3000/LogIn');
  } catch (error) {
    console.error('Error verifying email:', error);
    return res.status(500).json({ message: 'Error verifying email' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if user with the provided email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign role based on input email
    let userRole = 'user';
    if (email === 'alizaidbaber@gmail.com') {
      userRole = 'admin';
    }

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      role: userRole,
      isGuest: false,
      isActive: true // Set isActive to false initially
    });

    // Save the user to the database
    await newUser.save();

    // Send email verification
    const verificationToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      html: `<p>Click <a href="http://localhost:8000/api/auth/verify-email/${verificationToken}">here</a> to verify your email.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending verification email:', error);
        return res.status(500).json({ message: 'Error sending verification email' });
      } else {
        console.log('Verification email sent to:', email);
        return res.status(201).json({ message: 'Verification email sent. Please verify your email to activate your account.' });
      }
    });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Log-in API
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.error('Invalid credentials - User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If user is a guest, generate a guest ID and allow purchases without login
    if (user.isGuest) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '100y' });

      console.log('Guest user logged in:', user.email);
      return res.status(200).json({ token });
    }

    // Check if user is verified and active
    if (!user.isActive) {
      console.error('User is not yet verified');
      return res.status(401).json({ message: 'Please verify your email to activate your account' });
    }

    // Check password for regular users
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Invalid credentials - Incorrect password');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token for regular users
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, role: user.role, userId: user._id }); // Assuming user has a 'role' field in the database
    console.log('User logged in:', user.email);

    // res.status(200).json({ "user logged in ": token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot password API
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate new password
    const newPassword = Math.random().toString(36).slice(-8);

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Send new password to user's email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'New Password',
      text: `Your new password is: ${newPassword}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending new password:', error);
      } else {
        console.log('New password sent:', info.response);
      }
    });

    console.log('New password sent to:', email);
    res.status(200).json({ message: 'New password sent to your email' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify email API
router.post('/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's isActive status to true
    user.isActive = true;
    await user.save();

    console.log('User email verified:', user.email);
    res.status(200).json({ message: 'Email verified successfully. You can now login.' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/user-details/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details
    res.status(200).json({ email: user.email, username: user.username });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Change Password API
router.post('/change-password', async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
