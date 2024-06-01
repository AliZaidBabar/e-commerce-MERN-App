// api.js

const BASE_URL = 'http://localhost:8000/api/auth';
const PROD_URL = 'http://localhost:8000/api/products';
const CART_URL = 'http://localhost:8000/api/cart';
const ORDER_URL = 'http://localhost:8000/api/orders';

const api = {
  async signUp(data) {
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  async logIn(data) {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  async createProduct(productData) {
    try {
      const token = localStorage.getItem('token');
      console.log("token: ", token);
      const response = await fetch(`${PROD_URL}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
        },
        body: productData,
      });
      return await response.json();
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  async getUserDetails(userId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/user-details/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
  },

  async getProductsByCategory(category) {
    try {
      const response = await fetch(`${PROD_URL}/productsbycategory?category=${category}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  async getProductDetails(productId) {
    try {
      const response = await fetch(`${PROD_URL}/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },


  async addToCart(productId, shadeId, selectedWeight, quantity) {
    try {
      const token = localStorage.getItem('token');
      console.log("Token in cart :", token); // Add this line to check the token
      if (!token) {
        throw new Error('Unauthorized: Missing token');
      }

      const response = await fetch(`${CART_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include 'Bearer' prefix before the token
        },
        body: JSON.stringify({ productId, shadeId, selectedWeight, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  },


  async getCartItems() {
    try {
      const token = localStorage.getItem('token');
      console.log("Token in cart :", token); // Add this line to check the token
      if (!token) {
        throw new Error('Unauthorized: Missing token');
      }
      const response = await fetch(`${CART_URL}/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include 'Bearer' prefix before the token
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    }
  },


  async updateCartItemQuantity(cartItemId, quantity) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${CART_URL}/cart/${cartItemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include 'Bearer' prefix before the token
        },
        body: JSON.stringify({ quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart item quantity');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  },

  async deleteCartItem(cartItemId) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${CART_URL}/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include 'Bearer' prefix before the token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete cart item');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting cart item:', error);
      throw error;
    }
  },

  async clearCart() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${CART_URL}/cart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include 'Bearer' prefix before the token
        },
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      return await response.json();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },


  async placeOrder(orderData) {
    try {
      const token = localStorage.getItem('token');
      console.log('token in order', token);
      const response = await fetch(`${ORDER_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      return await response.json();
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  },


  // async processPayment(paymentData) {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch(`${ORDER_URL}/orders/payment`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(paymentData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to process payment');
  //     }

  //     return await response.json();
  //   } catch (error) {
  //     console.error('Error processing payment:', error);
  //     throw error;
  //   }
  // },

  async createCheckoutSession(cartItems) {
    console.log('cartItems',cartItems);
    try {
      const response = await fetch('http://localhost:8000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: cartItems }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }
};

export default api;
