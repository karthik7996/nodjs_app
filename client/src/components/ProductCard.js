import React from 'react'

const ProductCard = (props) => {
  return (
    <div className='productCard'>
        <img className="productImage"src={props.src} alt="product" />
        <div style={{padding: "0 10px"}}>
          <h3>{props.title}</h3>
          <p>Current Bid: <span className='currentBid'>{props.currentBid}</span></p>
          <p>Location: <span className='location'>{props.location}</span></p>
          <div style={{margin: "10px"}}>
            <button>Bid higher</button> 
            <img src="images/i_icon.svg" className="info" style={{  float: "right"}} />
          </div>
        </div>
    </div>
  )
}

export default ProductCard