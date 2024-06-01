import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../Api-integration/api';

function ProductsByCategory() {
  const [products, setProducts] = useState([]);
  const [selectedShade, setSelectedShade] = useState(null);
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0); // Initialize selectedWeightIndex
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const response = await api.getProductsByCategory(category);
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products by category:', error);
        setError('Error fetching products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  const handleShadeSelect = (shade) => {
    setSelectedShade(shade);
  };

  const handleWeightSelect = (index) => {
    setSelectedWeightIndex(index); // Update selectedWeightIndex
  };

  const handleAddToCart = async (productId, shadeId) => {
    try {
      // Get the selected weight based on selectedWeightIndex
      const selectedWeight = products.find(product => product._id === productId).weights[selectedWeightIndex];
      const quantity = 1;
      console.log("selectedWeight", selectedWeight);
      await api.addToCart(productId, shadeId, selectedWeight, quantity); // Pass selected weight
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again later.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Organize products by sub-category
  const groupedProducts = {};
  products.forEach((product) => {
    if (!groupedProducts[product.subcategory]) {
      groupedProducts[product.subcategory] = [];
    }
    groupedProducts[product.subcategory].push(product);
  });

  return (
    <div className="container mx-auto mt-8">
      <h1 className='text-center pt-5 pb-5'>{category}</h1>
      {Object.entries(groupedProducts).map(([subcategory, products]) => (
        <div key={subcategory}>
          <h2>{subcategory}</h2>
          <div className="row">
            {products.map(product => (
              <div key={product._id} className="col-lg-4 border overflow-hidden">
                <Link to={`/ProductDetailsPage/${product._id}`}>
                  <img src={product.image2} alt={product.name} className="w-full h-64 object-cover" />
                </Link>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  {/* Display product weight and price options as radio buttons */}
                  {product.weights.map((weight, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`weight-${index}`}
                        name="selectedWeight"
                        value={index}
                        onChange={() => handleWeightSelect(index)} // Call handleWeightSelect on change
                        checked={index === selectedWeightIndex} // Add checked attribute
                        className="mr-2"
                      />
                      <label htmlFor={`weight-${index}`} className="text-gray-700 mr-2">{weight.value} grams</label>
                      <label htmlFor={`weight-${index}`} className="text-gray-700">Price: ${weight.price}</label>
                    </div>
                  ))}

                  <p className="text-gray-700">Shade: </p>
                  <div className="flex gap-2">
                    {product.shades.map((shade, index) => (
                      <div
                        key={index}
                        className={`w-6 h-6 rounded-full cursor-pointer border ${selectedShade === shade._id ? 'border-black' : ''}`}
                        style={{ backgroundColor: shade.color }}
                        title={shade.color}
                        onClick={() => handleShadeSelect(shade._id)}
                      ></div>
                    ))}
                  </div>
                  <button
                    className="custombtn"
                    onClick={() => handleAddToCart(product._id, product.shades[0]._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsByCategory;
