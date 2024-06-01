// server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/AuthRoutes.js';
import productRoutes from './routes/ProductRoutes.js';
import cartRoutes from './routes/CartRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';
import {createCheckoutSession} from './paymentcontroller.js'
dotenv.config();

const app = express();
const Port = process.env.PORT;
// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.post("/api/create-checkout-session", createCheckoutSession);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  // Start the server
  app.listen(Port, () => {
    console.log('Server is running on port', Port);
  });
}).catch(err => console.error('Error connecting to MongoDB:', err));
