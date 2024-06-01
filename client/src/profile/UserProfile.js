import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api-integration/api';

function UserProfile() {
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('role');
        console.log('role :', role);
        if (role) {
            setUserRole(role);
        } else {
            // Redirect to login if role is not found
            // navigate('/LogIn');
            console.log('role ni mil rha');
        }
    }, []);

    const handleLogOut = () => {
        // Clear local storage and redirect to login page
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/LogIn');
    };

    const isAdmin = userRole === 'admin';

    return (
        <div className="container mx-auto max-w-md">
            {isAdmin ? (
                <AdminProfile handleLogOut={handleLogOut} />
            ) : (
                <UserDetails handleLogOut={handleLogOut} />
            )}
        </div>
    );
}

function AdminProfile({ handleLogOut }) {
    const [productName, setProductName] = useState('');
    const [productWeights, setProductWeights] = useState([]); // Updated state to store weights with prices
    const [productDescription1, setProductDescription1] = useState('');
    const [productDescription2, setProductDescription2] = useState('');
    const [productDescription3, setProductDescription3] = useState('');
    const [productDescription4, setProductDescription4] = useState('');
    const [productDescription5, setProductDescription5] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productSubcategory, setProductSubcategory] = useState('');
    const [productShades, setProductShades] = useState([]);
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');
    const userId = localStorage.getItem('userId');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.getUserDetails(userId);
                setUserEmail(response.email);
                setUsername(response.username);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const handlePasswordChange = async () => {
        try {
            const newPassword = prompt("Enter new password:");
            if (!newPassword) return;
            const response = await api.changePassword(newPassword);
            alert(response.message);
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Error changing password. Please try again.');
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();

        const shadesColors = productShades.map(shade => ({
            color: shade.color,
            image: shade.image
        }));

        const weightPrice = productWeights.map(weight => ({
            value: weight.value,
            price: weight.price
        }));

        const formData = new FormData();
        formData.append('name', productName);

        // Append weights and corresponding quantities and prices
        formData.append('weights', JSON.stringify(weightPrice)); // Ensure productWeights is defined
        formData.append('description1', productDescription1);
        formData.append('description2', productDescription2);
        formData.append('description3', productDescription3);
        formData.append('description4', productDescription4);
        formData.append('description5', productDescription5);
        formData.append('quantity', productQuantity);
        formData.append('category', productCategory);
        formData.append('subcategory', productSubcategory);
        formData.append('shades', JSON.stringify(shadesColors));
        formData.append('image1', image1);
        formData.append('image2', image2);
        formData.append('image3', image3);
        formData.append('image4', image4);
        formData.append('image5', image5);

        try {
            const response = await api.createProduct(formData);
            console.log('Product created:', response);
            // Clear form fields after successful product creation
            // setProductName('');
            // setProductPrice('');
            // setProductDescription1('');
            // setProductDescription2('');
            // setProductDescription3('');
            // setProductDescription4('');
            // setProductDescription5('');
            // setProductQuantity('');
            // setProductWeight('');
            // setProductCategory('');
            // setProductSubcategory('');
            // setProductShades([]);
            // setImage1(null);
            // setImage2(null);
            // setImage3(null);
            // setImage4(null);
            // setImage5(null);
            setError('');
        } catch (error) {
            console.error('Error creating product:', error);
            setError('Error creating product. Please try again.');
        }
    };

    const handleShadeAdd = () => {
        setProductShades([...productShades, { color: '#000000', image: null }]);
    };

    const handleShadeChange = (index, event) => {
        const { value } = event.target;
        const updatedShades = [...productShades];
        updatedShades[index].color = value;
        setProductShades(updatedShades);
    };

    const handleShadeImageUpload = (index, event) => {
        const file = event.target.files[0];
        const updatedShades = [...productShades];
        updatedShades[index].image = file;
        setProductShades(updatedShades);
    };

    const handleWeightChange = (index, key, event) => {
        const { value } = event.target;
        const updatedWeights = [...productWeights];
        updatedWeights[index][key] = value;
        setProductWeights(updatedWeights);
    };

    const handleWeightAdd = () => {
        setProductWeights([...productWeights, { value: '', price: '' }]);
    };

    return (
        <div>
            <div>
                <h2>Admin Profile</h2>
                <div>
                    <h3>User Details:</h3>
                    <p>Email: {userEmail}</p>
                    <p>Username: {username}</p>
                </div>
                <button onClick={handlePasswordChange} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Change Password</button>
            </div>
            <form onSubmit={handleProductSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                {/* Weight Inputs */}
                {productWeights.map((weight, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-sm font-medium mb-1">Weight {index + 1}</label>
                        <input
                            type="number"
                            value={weight.value}
                            onChange={(e) => handleWeightChange(index, 'value', e)}
                            className="form-input"
                            required
                        />
                        <label className="block text-sm font-medium mb-1">Price for Weight {index + 1}</label>
                        <input
                            type="number"
                            value={weight.price}
                            onChange={(e) => handleWeightChange(index, 'price', e)}
                            className="form-input"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleWeightAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Add Weight</button>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">What is it:</label>
                    <textarea
                        value={productDescription1}
                        onChange={(e) => setProductDescription1(e.target.value)}
                        className="form-textarea"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">who it's for</label>
                    <textarea
                        value={productDescription2}
                        onChange={(e) => setProductDescription2(e.target.value)}
                        className="form-textarea"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">How it work</label>
                    <textarea
                        value={productDescription3}
                        onChange={(e) => setProductDescription3(e.target.value)}
                        className="form-textarea"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">How to use</label>
                    <textarea
                        value={productDescription4}
                        onChange={(e) => setProductDescription4(e.target.value)}
                        className="form-textarea"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">ingredients</label>
                    <textarea
                        value={productDescription5}
                        onChange={(e) => setProductDescription5(e.target.value)}
                        className="form-textarea"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Quantity</label>
                    <input
                        type="number"
                        value={productQuantity}
                        onChange={(e) => setProductQuantity(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                {/* <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Weight</label>
                    <input
                        type="number"
                        value={productWeight}
                        onChange={(e) => setProductWeight(e.target.value)}
                        className="form-input"
                        required
                    />
                </div> */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                        type="text"
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Subcategory</label>
                    <input
                        type="text"
                        value={productSubcategory}
                        onChange={(e) => setProductSubcategory(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>
                {productShades.map((shade, index) => (
                    <div key={index} className="shade-input">
                        <label htmlFor={`shadeColor${index + 1}`}>Shade Color {index + 1}:</label>
                        <input
                            type="color"
                            id={`shadeColor${index + 1}`}
                            value={shade.color}
                            onChange={(e) => handleShadeChange(index, e)}
                            required
                        />
                        <div className="image-upload">
                            <label htmlFor={`shadeImage${index + 1}`}>Image for Shade {index + 1}:</label>
                            <input
                                type="file"
                                id={`shadeImage${index + 1}`}
                                accept="image/*"
                                onChange={(e) => handleShadeImageUpload(index, e)}
                                required
                            />
                        </div>
                    </div>
                ))}
                <button type="button" onClick={handleShadeAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Add Shade</button>
                <div className="mb-4">
                    <div>
                        <label>Image 1:</label>
                        <input type="file" accept="image/*" onChange={(e) => setImage1(e.target.files[0])} required />
                    </div>
                    <div>
                        <label>Image 2:</label>
                        <input type="file" accept="image/*" onChange={(e) => setImage2(e.target.files[0])} required />
                    </div>
                    <div>
                        <label>Image 3:</label>
                        <input type="file" accept="image/*" onChange={(e) => setImage3(e.target.files[0])} required />
                    </div>
                    <div>
                        <label>Image 4:</label>
                        <input type="file" accept="image/*" onChange={(e) => setImage4(e.target.files[0])} required />
                    </div>
                    <div>
                        <label>Image 5:</label>
                        <input type="file" accept="image/*" onChange={(e) => setImage5(e.target.files[0])} required />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Product</button>
            </form>
            <button onClick={handleLogOut} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">Log Out</button>
        </div>
    );
}

function UserDetails({ handleLogOut }) {
    const [userEmail, setUserEmail] = useState('');
    const [username, setUsername] = useState('');
    const userId = localStorage.getItem('userId');


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.getUserDetails(userId); // Pass userId to getUserDetails
                setUserEmail(response.email);
                setUsername(response.username);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userId]); // Make useEffect re-run when userId changes

    const handlePasswordChange = async () => {
        try {
            const newPassword = prompt("Enter new password:");
            if (!newPassword) return; // If user cancels, do nothing
            const response = await api.changePassword(newPassword); // Assuming an API function to change password
            alert(response.message); // Display success message
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Error changing password. Please try again.'); // Display error message
        }
    };

    return (
        <div>
            <h2>User Details</h2>
            <div>
                <h3>User Details:</h3>
                <p>Email: {userEmail}</p>
                <p>Username: {username}</p>
            </div>
            <button onClick={handlePasswordChange} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">Change Password</button>
            <button onClick={handleLogOut} className="bg-red-500 text-white px-4 py-2 mt-4 rounded">Log Out</button>
        </div>
    );
}

export default UserProfile;
