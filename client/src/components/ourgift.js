import React from 'react'
import gift from '../images/gift.png'
function ourgift() {

  return (
    <div className='gift container pt-5  pb-5 mb-5'>
      <div className="row">
        <h1 className='pb-5'>OUR GIFT TO YOU</h1>
        <div className="col-lg-6">
            <img src={gift} className='img-fluid'/>
        </div>
        <div className="col-lg-4 text-start ps-3">
            <h3>THIS ONE'S ON US</h3>
            <p>Choose a free mini Long-Wear Cream Shadow Stick when you spend $95+. Plus, get a free Lip Balm SPF with orders $115+. No code needed. Applies at checkout.</p>
            <p className="card-text" style={{textDecoration:'underline'}}>Shop now</p>

        </div>
      </div>
    </div>
  )
}

export default ourgift
