import React from 'react';
import basevideo from '../images/videos/extra.mp4';
import luxevideo from '../images/videos/luxe.mp4';
import mattevideo from '../images/videos/matte.mp4';

function LipForAnyBride() {
  const calculateHeight = (width) => {
    // Calculate the height based on the aspect ratio (9:16)
    return (width / 9) * 16;
  };

  return (
    <div className="shopbycategory container-fluid pb-5 pt-5">
      <div className="row">
        <div className="col-lg-4">
        <h3 className="text-start pb-3 pt-5 mt-5 ps-4">A LIP FOR <br></br>ANY BRIDE</h3>
        <p className=" text-start ps-4" > Explore our bridal lineup-<br></br> from balm to something bolder.</p>
        <p className="text-start ps-4" style={{textDecoration:'underline'}}>Shop Bridal</p>
        </div>
        <div className="col-lg-8">
          <div className="ps-4 row">
            
            <div className="col-lg-4">
              <div className="card bridalcard" style={{ width: '18rem' }}>
                <video
                  autoPlay
                  loop
                  muted
                  style={{ width: '100%', height: calculateHeight(300) }}
                >
                  <source src={basevideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="card-body border">
                  <p className="card-text mt-0" style={{ fontSize: '20px' }}>
                    Shop Skin
                  </p>
                  <p className="card-text text-start" >
                    A hydrating tint of color with 24-hour plumping. Seen here in bare raspberry.
                  </p>
                  <p className="card-text" style={{textDecoration:'underline'}}>Shop now</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card bridalcard" style={{ width: '18rem' }}>
                <video
                  autoPlay
                  loop
                  muted
                  style={{ width: '100%', height: calculateHeight(300) }}
                >
                  <source src={luxevideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="card-body border">
                  <p className="card-text" style={{ fontSize: '20px' }}>
                    Luxe Lipstick
                  </p>
                  <p className="card-text text-start" >
                    Skincare-infused satiny color with 10-hour wear. Seen here in New York Sunset.
                  </p>
                  <p className="card-text" style={{textDecoration:'underline'}}>Shop now</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card bridalcard" style={{ width: '18rem' }}>
                <video
                  autoPlay
                  loop
                  muted
                  style={{ width: '100%', height: calculateHeight(300) }}
                >
                  <source src={mattevideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="card-body border">
                  <p className="card-text" style={{ fontSize: '20px' }}>
                    Luxe Matte Lipstick
                  </p>
                  <p className="card-text text-start" >
                    An all day velvety matte that doesn't dry out. Seen here in Red Carpet.
                  </p>
                  <p className="card-text" style={{textDecoration:'underline'}}>Shop now</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LipForAnyBride;
