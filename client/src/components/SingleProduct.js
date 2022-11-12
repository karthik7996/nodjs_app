import React from 'react'
import { NavLink } from 'react-router-dom';
import {FaLessThan} from "react-icons/fa";
import {FaGreaterThan} from "react-icons/fa";

const SingleProduct = () => {
  return (<div className='fullHeight'>
    <div className='homeHeading'>
            <NavLink><p className="homeHeading-p">How  It Works</p></NavLink>
            <NavLink><p className="homeHeading-p">Auction</p></NavLink>
            <NavLink><p className="homeHeading-p">Sell your product</p></NavLink>
            <NavLink><p className="homeHeading-p" style={{marginBottom: "0"}}>Services and Support</p></NavLink>
        </div>
    <div className = "row singleproduct">
    <div id="carouselExampleInterval" class="col-sm-12 col-md-8 carousel slide border border-white p-5 pr-0" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active" data-interval="2000">
      <img src="/images/wahingmachinehd.jpg" class="d-block w-100 rounded" alt="..." />
    </div>
    <div class="carousel-item" data-interval="2000">
      <img src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80" class="d-block w-100 rounded" alt="..." />
    </div>
    <div class="carousel-item" data-interval="2000">
      <img src="https://images.unsplash.com/photo-1626806787426-5910811b6325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" class="d-block w-100 rounded" alt="..." />
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleInterval" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon"  aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
        <div className='col-sm col-md-4 border border-white text-left pt-3'>
          <p className='h1'>Samsung Washing Machine</p>
          <p className='text-secondary pt-2'>Minimum bid<span className="ml-4 text-white font-weight-bold" >Rs. 8000</span></p>
          <p className='border-bottom text-center pt-3 pb-3'>Details</p>
          <hr />
          <p>Sparkle Twinkel with animation parallax.Really satisfying and amazing NFTproject. wow! Really amazing.Creating this is really amating andlooking fot others particular type of art.If you love me. then you to buy me.</p>
          <div className="d-flex justify-content-around text-secondary pt-5">
              <p>Category</p> 
              <p>Location</p>
              <p>Year old</p>
          </div>
          <div className="d-flex justify-content-around">
              <p>Electronics</p> 
              <p>Delhi</p>
              <p>3 Years</p>
          </div>
          <p className="singleproducthr" ></p>
          <p className="text-secondary">Minimum bid</p>
          <p className='h1 font-weight-bold'>Rs 8000</p>
          <div className='text-center pt-5 pb-5'>
            <button className='btn btn-primary btn-lg w-75 rounded-pill font-weight-bold pt-3 pb-3'>Place a bid</button>
          </div>
        </div>
    </div>
    </div>
  )
}

export default SingleProduct

{/* <div className="col-8 d-flex align-items-center justify-content-around border border-white pt-5 "> */
          /* <FaLessThan />
          <img className="rounded singleproduct-img" src ="/images/washingMachine.png" alt ="washing machine"/>
          <FaGreaterThan />
        </div> */}

        // style={{backgroundImage: "url(https://cdn-icons-png.flaticon.com/512/6416/6416962.png)"}}