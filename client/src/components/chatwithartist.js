import React from 'react'
import chatvideo from '../images/videos/letschat.mp4'
import chatimage from '../images/chatimg.png'
function chatwithartist() {
    const calculateHeight = (width) => {
        // Calculate the height based on the aspect ratio (9:16)
        return (width / 9) * 20;
    };
  return (
    <div className='chatwithartist container-fluid'>
      <div className="row pt-5 pb-5">
        <div className="col-lg-4 text-start" style={{color:'white'}}>
        <p className='ps-4'>Always on Artistry</p>
        <h3 className='ps-4'>LET'S CHAT</h3>
        <h6 className='ps-4'>Looking for some tips? Our Artists love to share.</h6>
        <p className='ps-4'>Just ask us in Live Chat.</p>
        <p className='ps-4'>Monday–Friday 10 AM–10 PM ET<br></br>Saturday & Sunday 12 PM–8 PM ET</p>
        </div>
        <div className="col-lg-4">
        <video
                  autoPlay
                  loop
                  muted
                  style={{ width: '100%', height: calculateHeight(300) }}
                >
                  <source src={chatvideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
        </div>
        <div className="col-lg-4 pt-4">
            <img src={chatimage} className='img-fluid'/>

        </div>
      </div>
    </div>
  )
}

export default chatwithartist
