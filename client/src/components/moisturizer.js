import React from 'react'
import bigimage from '../images/Large_Image_VE_HP.png';
import smallimage from '../images/Small_Image_VE_HP.png';
function moisturizer() {
  return (
    <div className='moist container-fluid pt-5 pb-5'>
      <div className="row text-start">
        <div className="col-lg-3 ">
        <h3 className='ps-4'>SKIN CARE</h3>
        <h6 className='ps-4'>The Vitamin Enriched Collection</h6>
        <p className='ps-4'>Protect your skin from the elements with our ultra-nourishing skincare collection – perfect for layering.</p>
        <p className='ps-4'><a style={{textDecoration:'underline'}}>Shop Now</a></p>
        </div>
        <div className="col-lg-5">
         <img src={bigimage} className='img-fluid'/>
        </div>
        <div className="col-lg-4">
         <img src={smallimage} className='img-fluid'/>
        </div>
      </div>
    </div>
  )
}

export default moisturizer
