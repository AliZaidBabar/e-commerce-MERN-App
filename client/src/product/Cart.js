import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import api from '../Api-integration/api';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await api.getCartItems();
        setCartItems(response);
        calculateTotal(response);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    let price = 0;
    let quantity = 0;
    items.forEach(item => {
      price += item.selectedWeight.price * item.quantity;
      quantity += item.quantity;
    });
    setTotalPrice(price);
    setTotalQuantity(quantity);
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      await api.updateCartItemQuantity(cartItemId, newQuantity);
      const updatedItems = cartItems.map(item =>
        item._id === cartItemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleIncrement = (cartItemId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    handleQuantityChange(cartItemId, newQuantity);
  };

  const handleDecrement = (cartItemId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      handleQuantityChange(cartItemId, newQuantity);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await api.deleteCartItem(cartItemId);
      const updatedItems = cartItems.filter(item => item._id !== cartItemId);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantity(0);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      // Extract necessary information from cartItems
      const checkoutData = cartItems.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        productid: item.product._id,
        totalPrice: item.selectedWeight.price * item.quantity
      }));
  
      // Check the size of the request payload
      const totalPayloadSize = JSON.stringify(checkoutData).length;
      if (totalPayloadSize > 5000) {
        console.error('Payload too large. Please reduce the number of items in the cart.');
        return;
      }
  
      // Send checkoutData to the backend
      const response = await api.createCheckoutSession(checkoutData);
  
      // Proceed with Stripe checkout
      const stripe = await loadStripe("pk_test_51PEzKBRsi1VRB1yIXCqrZLNvV2RhFj87adITBVy3ciPKKduxxhwQnFXlt8ujlN2zL9J149AVumcpSdNX2BDrKWRb005DHG1EfD");
      const sessionId = response.id;
      const { error } = await stripe.redirectToCheckout({ sessionId });
  
      if (error) {
        console.error("Error:", error);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  
  return (
    <div className="container mx-auto mt-24">
      <h2 className="text-3xl font-semibold mb-4">Shopping Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItems.map(item => (
          <div key={item._id} className="rounded-lg overflow-hidden border border-gray-300 shadow-md">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img src={`data:image/png/jpg/jpeg;base64,${item.product.image1}`} alt={item.product.name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <p className="text-lg font-semibold">{item.product.name}</p>
                  {item.shade && (
                    <p className="text-gray-700">Color: {item.shade.color}</p>
                  )}
                  {/* Display selected weight and price */}
                  {item.selectedWeight && (
                    <p className="text-gray-700">Weight: {item.selectedWeight.value} grams</p>
                  )}
                  {item.selectedWeight && (
                    <p className="text-gray-700">Price: ${item.selectedWeight.price}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center">
                <button onClick={() => handleDecrement(item._id, item.quantity)} className="text-red-500">-</button>
                <input
                  type="number"
                  className="border rounded-md p-1 w-20 mx-2"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                />
                <button onClick={() => handleIncrement(item._id, item.quantity)} className="text-green-500">+</button>
                <button
                  className="text-red-500 ml-4"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
      <div className="mt-8 flex justify-center">
        {/* <Link className="bg-red-500 text-white px-4 py-2 rounded-md" to='/OrderForm'>Check Out</Link> */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md ml-4"
          onClick={handleCheckout}
        >
          Checkout (${totalPrice})
        </button>
      </div>
    </div>
  );
}

export default Cart;
