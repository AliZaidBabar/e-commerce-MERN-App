// components/shopbycategory.js
import React from 'react';
import { Link } from 'react-router-dom';
import Skinimg from '../images/skin.jpg';
import Faceimg from '../images/face.jpg';
import Eyeimg from '../images/eye.jpg';
import Lipsimg from '../images/lips.jpg';

function ShopByCategory() {
  return (
    <div className='shopbycategory container-fluid pb-5'>
      <div className="ps-4 row">
        <h3 className=' text-start pb-3'>SHOP BY CATEGORY</h3>
        <div className="col-lg-3">
          <Link to="/ProductByCategory/skin">
            <div className="card" style={{ width: '18rem' }}>
              <img src={Skinimg} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text" style={{ fontSize: '20px' }}>Shop Skin</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-lg-3">
          <Link to="/ProductByCategory/face">
            <div className="card" style={{ width: '18rem' }}>
              <img src={Faceimg} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text" style={{ fontSize: '20px' }}>Shop Face</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-lg-3">
          <Link to="/ProductByCategory/eye">
            <div className="card" style={{ width: '18rem' }}>
              <img src={Eyeimg} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text" style={{ fontSize: '20px' }}>Shop Eye</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-lg-3">
          <Link to="/ProductByCategory/lips">
            <div className="card" style={{ width: '18rem' }}>
              <img src={Lipsimg} className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text" style={{ fontSize: '20px' }}>Shop Lips</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ShopByCategory;
