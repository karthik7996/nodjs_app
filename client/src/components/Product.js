import React from 'react'
import {NavLink} from "react-router-dom"
import ProductCard from './ProductCard'
const product = () => {
    
  return (
    <div>
        <div className='homeHeading'>
            <NavLink><p className="homeHeading-p">How  It Works</p></NavLink>
            <NavLink><p className="homeHeading-p">Auction</p></NavLink>
            <NavLink><p className="homeHeading-p">Sell your product</p></NavLink>
            <NavLink><p className="homeHeading-p pt-3" style={{marginBottom: "0"}}>Services and Support</p></NavLink>
        </div>
        
        <div className="row pl-5" >
        <ProductCard />
        </div>
    </div>
  )
}

export default product