import React from 'react'
import Reviews from '../images/rating.png'
function productreviews() {
  return (
    <div className='productreviews container pb-5 ps-5'>
      <div className="row">
        <h1 className='text-start pb-5'>TOP REVIEWS</h1>
        <div className="col-lg-2 border pt-3 me-2">
            <img src={Reviews} className='img-fluid'/>
            <p className='text-start pt-3' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, eveniet voluptas quidem nesciunt omnis blanditiis ad voluptates modi expedita enim in neque quibusdam quam impedit commodi dolorum mollitia eaque ipsam.</p>
            <p className='text-start pt-3 pb-0' ><b>Review's Name</b><br></br>Review's Address</p>
        </div>
        <div className="col-lg-2 border pt-3 me-2">
            <img src={Reviews} className='img-fluid'/>
            <p className='text-start pt-3' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, eveniet voluptas quidem nesciunt omnis blanditiis ad voluptates modi expedita enim in neque quibusdam quam impedit commodi dolorum mollitia eaque ipsam.</p>
            <p className='text-start pt-3 pb-0' ><b>Review's Name</b><br></br>Review's Address</p>
        </div>
        <div className="col-lg-2 border pt-3 me-2">
            <img src={Reviews} className='img-fluid'/>
            <p className='text-start pt-3' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, eveniet voluptas quidem nesciunt omnis blanditiis ad voluptates modi expedita enim in neque quibusdam quam impedit commodi dolorum mollitia eaque ipsam.</p>
            <p className='text-start pt-3 pb-0' ><b>Review's Name</b><br></br>Review's Address</p>
        </div>
        <div className="col-lg-2 border pt-3 me-2">
            <img src={Reviews} className='img-fluid'/>
            <p className='text-start pt-3' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, eveniet voluptas quidem nesciunt omnis blanditiis ad voluptates modi expedita enim in neque quibusdam quam impedit commodi dolorum mollitia eaque ipsam.</p>
            <p className='text-start pt-3 pb-0' ><b>Review's Name</b><br></br>Review's Address</p>
        </div>
      </div>
    </div>
  )
}

export default productreviews
