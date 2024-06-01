// // models/Product.js

// import mongoose from 'mongoose';

// const shadeSchema = new mongoose.Schema({
//   color: {
//     type: String,
//     required: true
//   },
//   image:{
//     type: String,
//     required: true
//   }
// });

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   description1: {
//     type: String,
//     required: true
//   },
//   description2: {
//     type: String,
//     required: true
//   },
//   description3: {
//     type: String,
//     required: true
//   },
//   description4: {
//     type: String,
//     required: true
//   },
//   description5: {
//     type: String,
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   },
//   weight: {
//     type: Number,
//     required: true
//   },
//   category: {
//     type: String,
//     required: true
//   },
//   subcategory: {
//     type: String,
//     required: true
//   },
//   shades: [shadeSchema],
//   image1: {
//     type: String,
//     required: true
//   },
//   image2: {
//     type: String,
//     required: true
//   },
//   image3: {
//     type: String,
//     required: true
//   },
//   image4: {
//     type: String,
//     required: true
//   },
//   image5: {
//     type: String,
//     required: true
//   },});

// const Product = mongoose.model('Product', productSchema);

// export default Product;



// models/Product.js

import mongoose from 'mongoose';

const weightSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const shadeSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true
  },
  image:{
    type: String,
    required: true
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weights: [weightSchema], // Array of weights with prices
  description1: {
    type: String,
    required: true
  },
  description2: {
    type: String,
    required: true
  },
  description3: {
    type: String,
    required: true
  },
  description4: {
    type: String,
    required: true
  },
  description5: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  shades: [shadeSchema],
  image1: {
    type: String,
    required: true
  },
  image2: {
    type: String,
    required: true
  },
  image3: {
    type: String,
    required: true
  },
  image4: {
    type: String,
    required: true
  },
  image5: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
