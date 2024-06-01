import React from 'react'
import Rating from '../images/rating.png'
function normalreviews() {
    return (
        <div className="container-fluid pb-5">
            <div className="row">
            <div className="card text-start mb-3">
                <div className="card-header">
                    <img src={Rating} className='img-fluid'/>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>A well-known review, contained in a blockquote element.</p>
                        <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                    </blockquote>
                </div>
            </div>
            <div className="card text-start mb-3">
                <div className="card-header">
                    <img src={Rating} className='img-fluid'/>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>A well-known review, contained in a blockquote element.</p>
                        <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                    </blockquote>
                </div>
            </div>
            <div className="card text-start mb-3">
                <div className="card-header">
                    <img src={Rating} className='img-fluid'/>
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>A well-known review, contained in a blockquote element.</p>
                        <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                    </blockquote>
                </div>
            </div>
            </div>
        </div>
    )
}

export default normalreviews
