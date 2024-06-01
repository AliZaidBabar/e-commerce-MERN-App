import React from 'react';
import '../style.css';
import imagea from '../images/1.png';
import imageb from '../images/2.png';
import imagec from '../images/3.png';
import imaged from '../images/4.png';
function CardCarousel() {
    return (
        <div className="motherdayspecial container-fluid pb-5">
            <div className="row pt-5">
                <div className="col-lg-4 text-start" style={{color:'white'}}>
                    <h3 className='ps-4'>MOTHER'S DAY <br></br>GIFT GUIDE</h3>
                    <p className='ps-4'>Effortless beauty with<br></br> multitasking power: a gift<br></br> Mom will appreciate every day.</p>
                    <p className='ps-4'><a style={{textDecoration:'underline'}}>Shop Now</a></p>
                </div>
                <div className="col-lg-8">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="card-group">
                                    <div className="card shadow me-4">
                                        <img src={imagea} className="card-img-top" alt="Placeholder" />
                                        <div className="card-body">
                                            <h5 className="card-title">Card 1</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                    <div className="card shadow  me-4">
                                        <img src={imageb} className="card-img-top" alt="Placeholder" />
                                        <div className="card-body">
                                            <h5 className="card-title">Card 2</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                    <div className="card shadow me-4">
                                        <img src={imagec} className="card-img-top" alt="Placeholder" />
                                        <div className="card-body">
                                            <h5 className="card-title">Card 3</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item ">
                                <div className="card-group">
                                    <div className="card shadow me-4">
                                        <img src={imaged} className="card-img-top" alt="Placeholder" />
                                        <div className="card-body">
                                            <h5 className="card-title">Card 4</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                    <div className="card shadow me-4">
                                        <img src={imagea} className="card-img-top" alt="Placeholder" />
                                        <div className="card-body">
                                            <h5 className="card-title">Card 5</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                    <div className="card shadow me-4">
                                        <img src={imageb} className="card-img-top" alt="Placeholder" />
                                        <div className="card-body">
                                            <h5 className="card-title">Card 6</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className=" carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="controller carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className=" carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="controller carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-lg-2">
                </div>
            </div>
        </div>
    );
}

export default CardCarousel;
