import React from 'react'
import {NavLink} from "react-router-dom"
import ProductCard from './ProductCard'
const product = () => {
    function productDisplay(){
        let product =[]
        for(let i=0;i<40;i++){
            product.push(<ProductCard key={i} src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>)
        }
        return product
    }
  return (
    <div>
        <div className='homeHeading'>
            <NavLink><p className="homeHeading-p">How  It Works</p></NavLink>
            <NavLink><p className="homeHeading-p">Auction</p></NavLink>
            <NavLink><p className="homeHeading-p">Sell your product</p></NavLink>
            <NavLink><p className="homeHeading-p" style={{marginBottom: "0"}}>Services and Support</p></NavLink>
        </div>
        
        <div className="row" style={{display: "flex", justifyContent: "space-around"}}>
        {productDisplay()}
        </div>
    </div>
  )
}

export default product