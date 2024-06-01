import React from 'react';
import '../style.css';
import { Link } from 'react-router-dom';
import productData from './productData'; // Importing product data

function BestSellers() {
    // Filter products with the "Best Seller" subcategory
    const bestSellers = productData.filter(item => item.subcategory === 'Best Seller');

    // Chunk the best seller data into groups of three
    const chunks = bestSellers.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index / 3);
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [];
        }
        resultArray[chunkIndex].push(item);
        return resultArray;
    }, []);

    return (
        <div className="bestsellers container-fluid pb-5 mb-5 pt-5">
            <div className="row pt-5">
                <div className="col-lg-4 text-start" style={{color:'black'}}>
                    <h1 className='ps-4 font-semibold'>SHOP <br></br>BEST SELLERS</h1>
                    <p className='ps-4'><a style={{textDecoration:'underline'}}>Shop all bestsellers</a></p>
                </div>
                <div className="col-lg-8">
                    <div id="carouselExampleControl" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {chunks.map((chunk, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <div className="card-group">
                                        {chunk.map(item => (
                                            <div key={item.id} className="card me-4">
                                                <img src={item.image1} className="card-img-top" alt="Placeholder" style={{ height: '300px' }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                        
                                                    <button type="button" className='custombtn' ><Link className='link' to={`/product/${item.id}`} style={{color:'white',textDecoration:'none'}}>Shop Now</Link></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControl" data-bs-slide="prev">
                            <span className="controller carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControl" data-bs-slide="next">
                            <span className="controller carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-lg-2"></div>
            </div>
        </div>
    );
}

export default BestSellers;
