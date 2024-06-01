// routes/ProductRoutes.js

import express from 'express';
import jwt from 'jsonwebtoken';
import Product from '../models/Product.js';
import multer from 'multer';
import sizeOf from 'image-size';
import Jimp from 'jimp';

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err); // Add this line for debugging
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a product
// router.post('/products', verifyToken, upload.array('images', 5), async (req, res) => {
//   console.log('Request Body Shades:', req.body.shades); // Add this line to log shades data from the request body

//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: 'No files uploaded' });
//     }

//     const { name, price, description1, description2, description3, description4, description5, quantity, weight, category, subcategory, shades } = req.body;
//     const images = req.files.map(file => file.buffer.toString('base64')); // Convert image buffer to base64 string

//     // Parse shades array from JSON string to array of strings
//     const parsedShades = JSON.parse(shades);

//     const newProduct = new Product({
//       name,
//       price,
//       description1,
//       description2,
//       description3,
//       description4,
//       description5,
//       quantity,
//       weight,
//       category,
//       subcategory,
//       shades: parsedShades.map(color => ({ color })), // Map shades to objects with 'color' property
//       images
//     });

//     await newProduct.save();

//     console.log('Product created:', newProduct);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     console.error('Error creating product:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Create a product
// router.post('/products', verifyToken, upload.fields([
//   { name: 'image1', maxCount: 1 },
//   { name: 'image2', maxCount: 1 },
//   { name: 'image3', maxCount: 1 },
//   { name: 'image4', maxCount: 1 },
//   { name: 'image5', maxCount: 1 }
// ]), async (req, res) => {
//   try {
//     const { name, price, description1, description2, description3, description4, description5, quantity, weight, category, subcategory, shades } = req.body;
//     const { image1, image2, image3, image4, image5 } = req.files;

//     // Convert image buffers to base64 strings
//     const images = {
//       image1: image1[0].buffer.toString('base64'),
//       image2: image2[0].buffer.toString('base64'),
//       image3: image3[0].buffer.toString('base64'),
//       image4: image4[0].buffer.toString('base64'),
//       image5: image5[0].buffer.toString('base64')
//     };

//     // Parse shades array from JSON string to array of objects
//     const parsedShades = JSON.parse(shades);

//     const newProduct = new Product({
//       name,
//       price,
//       description1,
//       description2,
//       description3,
//       description4,
//       description5,
//       quantity,
//       weight,
//       category,
//       subcategory,
//       shades: parsedShades.map(color => ({ color })),
//       ...images
//     });

//     await newProduct.save();

//     console.log('Product created:', newProduct);
//     res.status(201).json(newProduct);
//   } catch (error) {
//     console.error('Error creating product:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.post('/products', verifyToken, upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, description1, description2, description3, description4, description5, quantity, category, subcategory, weights, shades } = req.body;

    // Ensure all required fields and files are present
    if (!name || !description1 || !description2 || !description3 || !description4 || !description5 || !category || !subcategory || !weights || !shades || !req.files.image1 || !req.files.image2 || !req.files.image3 || !req.files.image4 || !req.files.image5) {
      return res.status(400).json({ message: 'All fields and images are required' });
    }

    // Function to resize and compress image
    const processImage = async (image) => {
      const buffer = await Jimp.read(image[0].buffer);
      buffer.resize(800, Jimp.AUTO); // Resize image to fit within 800px width
      buffer.quality(80); // Set image quality to 80%
      return buffer.getBase64Async(Jimp.MIME_JPEG); // Convert image to base64
    };

    // Convert images to base64
    const images = {
      image1: await processImage(req.files.image1),
      image2: await processImage(req.files.image2),
      image3: await processImage(req.files.image3),
      image4: await processImage(req.files.image4),
      image5: await processImage(req.files.image5)
    };

    // Parse weights array from JSON string to array of objects
    const weightsArray = JSON.parse(weights).map(weight => ({
      value: weight.value,
      price: weight.price
    }));

    // Parse shades array from JSON string to array of objects
    const shadesArray = JSON.parse(shades).map((shade, index) => ({
      color: shade.color,
      image: images[`image${index + 1}`]
    }));

    // Construct product object with base64 image strings
    const newProduct = new Product({
      name,
      description1,
      description2,
      description3,
      description4,
      description5,
      quantity,
      category,
      subcategory,
      weights: weightsArray,
      shades: shadesArray,
      ...images
    });

    await newProduct.save();

    console.log('Product created:', newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Fetch a specific shade of a product
router.get('/products/:productId/shades/:shadeId', async (req, res) => {
  try {
    const { productId, shadeId } = req.params;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Find the shade by ID
    const shade = product.shades.find(shade => shade._id.toString() === shadeId);

    if (!shade) {
      return res.status(404).json({ message: 'Shade not found for this product' });
    }

    // Return the shade details
    res.status(200).json(shade);
  } catch (error) {
    console.error('Error fetching shade:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read all products
router.get('/products', async (req, res) => {
  console.log('hello from products');
  try {
    const products = await Product.find();
    console.log('Products fetched:', products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Read all products by category
router.get('/productsbycategory', async (req, res) => {
  try {
    const { category } = req.query; // Extract the category query parameter from the request

    // Check if a category is provided
    if (!category) {
      return res.status(400).json({ message: 'Category parameter is missing' });
    }

    // Find products by the provided category
    const products = await Product.find({ category });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this category' });
    }

    console.log(`Products fetched for category '${category}':`, products);
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Read specific product
router.get('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product fetched:', product);
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a product
router.put('/products/:productId', verifyToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const productData = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product updated:', updatedProduct);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a product
router.delete('/products/:productId', verifyToken, async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product deleted:', deletedProduct);
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Any other APIs related to product management can be added here

export default router;
