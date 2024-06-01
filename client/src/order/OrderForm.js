import React, { useState } from 'react';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import api from '../Api-integration/api';
import { useNavigate } from 'react-router-dom';


// toast.configure();

function OrderForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        streetAddress: '',
        floor: '',
        zipCode: '',
        city: '',
        phoneNumber: '',
        email: '',
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the API to place the order
            const order = await api.placeOrder(formData);
            console.log('Order placed:', order);
            // Navigate to payment page
             navigate('/order-payment');
        } catch (error) {
            console.error('Error placing order:', error);
            console.log('Failed to place order. Please try again later.');
        }
    };

    return (
        <div className="container mx-auto mt-24">
            <h2 className="text-3xl font-semibold mb-4">Order Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="border rounded-md p-1 w-64"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="border rounded-md p-1 w-64"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="streetAddress" className="block text-gray-700">Street Address:</label>
                    <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        className="border rounded-md p-1 w-64"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="floor" className="block text-gray-700">Floor:</label>
                    <input
                        type="text"
                        id="floor"
                        name="floor"
                        value={formData.floor}
                        onChange={handleChange}
                        className="border rounded-md p-1 w-64"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="zipCode" className="block text-gray-700">ZIP Code:</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="border rounded-md p-1 w-64"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block text-gray-700">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="border rounded-md p-1 w-64"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="border rounded-md p-1 w-64"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="border rounded-md p-1 w-64"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
                    Proceed to Payment
                </button>
            </form>
        </div>
    );
}

export default OrderForm;
