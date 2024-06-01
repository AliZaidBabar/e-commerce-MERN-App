// Import React and useState hook
import React, { useState } from 'react';
import api from '../Api-integration/api';

// Define payment status constants
const PaymentStatus = {
  PROCESSING: 'Processing your payment...',
  SUCCESS: 'Payment successful. Your order has been confirmed.',
  FAILURE: 'Payment failed. Please try again later.'
};

// Define the functional component
function OrderPayment() {
  // Initialize state variables for card details, payment status, and error
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiryDate: '', cvc: '' });
  const [paymentStatus, setPaymentStatus] = useState(PaymentStatus.PROCESSING);
  const [error, setError] = useState('');

  // Handle change in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Disable the button to prevent multiple submissions
      e.target.querySelector('button').disabled = true;

      // Extract the expiry month from the expiry date
      const expiryDateParts = cardDetails.expiryDate.split('-');
      const expMonth = expiryDateParts[1];

      // Construct the payment details object
      const paymentDetails = {
        name: 'John Doe', // Example name
        email: 'john.doe@example.com', // Example email
        phone: '1234567890', // Example phone number
        cardDetails: {
          ...cardDetails,
          exp_month: expMonth // Add the expiration month
        },
        totalPrice: 2000 // Example total price
      };

      // Call the API to process the payment
      const paymentResult = await api.processPayment(paymentDetails);
      console.log('Payment processed:', paymentResult);
      setPaymentStatus(PaymentStatus.SUCCESS); // Set payment status to success
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Payment failed. Please try again later.'); // Set error message
      setPaymentStatus(PaymentStatus.FAILURE); // Set payment status to failure
    }
  };

  // JSX for the component
  return (
    <div className="container mx-auto mt-24">
      <h2 className="text-3xl font-semibold mb-4">Order Payment</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for card details */}
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block text-gray-700">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleChange}
            className="border rounded-md p-1 w-64"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="expiryDate" className="block text-gray-700">Expiry Date:</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={cardDetails.expiryDate}
            onChange={handleChange}
            className="border rounded-md p-1 w-64"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cvc" className="block text-gray-700">CVV/CVC:</label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            value={cardDetails.cvc}
            onChange={handleChange}
            className="border rounded-md p-1 w-64"
            required
          />
        </div>
        {/* Button to submit payment */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
          Proceed to Payment
        </button>
      </form>
      {/* Display payment status or error message */}
      {paymentStatus !== PaymentStatus.PROCESSING && (
        <p className={`mt-4 ${paymentStatus === PaymentStatus.SUCCESS ? 'text-green-600' : 'text-red-600'}`}>
          {paymentStatus === PaymentStatus.SUCCESS ? 'Payment successful. Your order has been confirmed.' : error}
        </p>
      )}
    </div>
  );
}

// Export the component
export default OrderPayment;
