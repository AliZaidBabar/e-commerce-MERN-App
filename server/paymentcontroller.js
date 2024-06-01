// paymentController.js

import Stripe from 'stripe';
import Product from './models/Product.js';
const stripe = new Stripe('sk_test_51PEzKBRsi1VRB1yIgMKsIR1g6CDFb3tAto2NTe5JQss1v9JPUROh9aPFPtHsc7vbHGP1RsoJ4Cl7Qdoz8H605oMJ00C427qKEg');

export const createCheckoutSession = async (req, res) => {

    console.log("in payment");
  try {
    const { products } = req.body;

    // Extract necessary information from products array
    const lineItems = products.map((product) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.productName // Use productName from frontend data
          },
          unit_amount: product.totalPrice * 100 // Use totalPrice from frontend data, assuming it's in cents
        },
        quantity: product.quantity
      }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    // Reduce product quantity in the database
    for (const product of products) {
        await Product.findByIdAndUpdate(
          product.productid,
          { $inc: { quantity: -product.quantity } },
          { new: true }
        );
      }
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
};
