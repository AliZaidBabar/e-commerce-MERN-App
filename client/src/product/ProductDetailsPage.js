import React, { useState, useEffect } from 'react';
import Rating from '../images/rating.png';
import { useParams } from 'react-router-dom';
import api from '../Api-integration/api';
// import ProductReviews from '../components/ProductReviews';
// import RatingBar from '../components/RatingBar';
// import NormalReviews from '../components/NormalReviews';

function ProductDetailsPage() {
    const [product, setProduct] = useState(null);
    const { productId } = useParams();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await api.getProductDetails(productId);
                setProduct(response);
            } catch (error) {
                console.error('Error fetching product details:', error);
                // Handle error
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <div className='productdetailspage container-fluid'>
            <div className="row pt-5 mt-5">
                <h1>{product.name}</h1>
                <div className="container">
                    <div className="row ps-4">
                        <p className='text-start ps-5'>{product.category}</p>
                    </div>
                </div>
                <div className="row border border-end-0 border-start-0 ">
                    <p className='text-start ps-4 pt-2' style={{ textDecoration: 'underline' }}><img src={Rating} width={100} className='pe-2' /> 5 Star ({product.reviews ? product.reviews.length : 0} Reviews)</p>
                </div>
                <div className="col-lg-8">
                    <div className="container">
                        <div className="row">
                            <div className="col-6 col-lg-6 col-md-3 pt-3">
                                <img src={`data:image/jpeg/jpg/png;base64,${product.image1}`} className='img-fluid' alt={product.name} />
                                <img src={`data:image/jpeg/jpg/png;base64,${product.image2}`} className='img-fluid' alt={product.name} />
                                <img src={`data:image/jpeg/jpg/png;base64,${product.image3}`} className='img-fluid' alt={product.name} />
                                <img src={`data:image/jpeg/jpg/png;base64,${product.image4}`} className='img-fluid' alt={product.name} />
                                <img src={`data:image/jpeg/jpg/png;base64,${product.image5}`} className='img-fluid' alt={product.name} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-lg-4 text-start border mt-3 pt-5 ps-5">
                    <div className="container border border-start-0 border-end-0 pt-3 pb-3">
                        <div className="form-check pb-2" style={{ fontSize: '19px' }}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                <b style={{ color: '#C8323E' }}>${product.price} </b>| {product.weight}g
                            </label>
                        </div>
                    </div>


                    <div className="container border border-start-0 border-end-0 border-top-0 pt-3 pb-3">
                        <div className="form-check pb-2" style={{ fontSize: '19px' }}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                            <label className="form-check-label " htmlFor="flexRadioDefault1">
                                One-time Purchase
                            </label>
                        </div>
                        <div className="form-check" style={{ fontSize: '19px' }}>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Subscribe and Save 15%
                            </label>
                        </div>
                    </div>
                    <div className="container border border-start-0 border-end-0 border-top-0 pt-3 pb-3">
                        <h6>Delivery Method</h6>
                        <p>Select at cart or checkout</p>
                        {/* Add delivery options here based on product */}
                    </div>
                    <button type="button" className='custombtn mb-5 mt-5'>Add to Bag</button>
                    <div className="container p-4" style={{ backgroundColor: '#F1F1F1', color: 'black' }}>
                        <p>{product.description}</p>
                    </div>
                    <div className="container pt-5">
                        <div className="accordion " id="accordionExample">
                            <div className="accordion-item border border-end-0 border-start-0">
                                <h2 className="accordion-header ">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        What it is ?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {product.description1}
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item border border-end-0 border-start-0 border-bottom-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Who it's for?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {product.description2}
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item border border-end-0 border-start-0 border-bottom-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        How it work?
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {product.description3}
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item border border-end-0 border-start-0 border-bottom-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseThree">
                                        How to use?
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {product.description4}
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item border border-end-0 border-start-0 border-bottom-0">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseThree">
                                        Ingredients
                                    </button>
                                </h2>
                                <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        {product.description5}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    {/* <ProductReviews reviews={product.reviews} /> */}
                </div>
            </div>
            <div className="container-fluid mb-5 mt-5">
                <div className="row">
                    <div className="col-lg-6 text-start">
                        <h1>CUSTOMER REVIEWS | ASK & ANSWER</h1>
                        <div className="row">
                            <div className="col-lg-6">
                                <p className='text-start ps-4 pt-2' style={{ textDecoration: 'underline' }}><img src={Rating} width={100} className='pe-2' /> 5 Star Rating (200 Reviews)</p>
                                <button type="button" className='custombtn mb-3 mt-2'>Write a Review</button>
                                <p>98% of respondents would recommend this to a friend</p>
                            </div>
                            <div className="col-lg-6">
                                {/* <RatingBar /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid pb-5">
                {/* <NormalReviews /> */}
            </div>
        </div>
    );
}

export default ProductDetailsPage;
