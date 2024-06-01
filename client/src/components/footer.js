import React from 'react'

function footer() {
  return (
    <div className="footer container-fluid">
    <footer className="py-5 text-center text-sm-start"> 
      <div className="row">
      <h1 className='footerlogo text-4xl text-center pb-5 mb-5'>HEALTH & BEAUTY COSMETICS</h1>
        <div className="col-md-4 offset-md-1 mb-3">
         
          <div className="container mt-2">

            <p className='text-sm pt-1'>Sign up for Email Notifications and get 15% off your first order.</p>
          </div>
          <div className="d-flex flex-column flex-sm-row w-100 gap-2">
            <button className="newsbtn btn btn-lol ms-2 mt-3" type="button">Sign up</button>
          </div>
        </div>
        
  
        <div className="col-4 col-md-2 mb-3">
          <h6>My Health & Beauty</h6>
          <ul className="nav flex-column pt-3" >
            <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >Track My Order</a></li>
            <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >BB Access</a></li>
            <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >My Account</a></li>
          </ul>
        </div>
  
        <div className="col-4 col-md-2 mb-3">
          <h6>Need Help?</h6>
          <ul className="nav flex-column pt-3">
          <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >Return & Exchange</a></li>
          <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >Shipping</a></li>
          <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >Promotions</a></li>
          <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >Discontinued Products</a></li>
          <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >FAQs</a></li>
          <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >Gift Cards</a></li>
          <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >Afterpay</a></li>
          <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >Store Locator</a></li>
          </ul>
        </div>
        <div className="col-4 col-md-2 mb-3">
          <h6>Virtual Services</h6>
          <ul className="nav flex-column pt-3">
          <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >Virtual Artistry Consultation</a></li>
          <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >Health & Beauty Live</a></li>
          <li className="items nav-item mb-2" ><a href="#" className="" style={{color:'Gray',textDecoration:'none'}} >Virtual Try-on</a></li>
          </ul>
        </div>
      </div>
      <p className='items pt-5 text-sm text-center '>© 2024 Company, Inc. All rights reserved.</p>
    </footer>
  </div>
  )
}

export default footer
