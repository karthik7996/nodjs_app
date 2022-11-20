import React from 'react'
import { NavLink } from 'react-router-dom';
import HeaderCard from './HeaderCard'
import {FaGreaterThan} from "react-icons/fa"
import ProductCard from './ProductCard';
import Footer from './Footer';
const Home = () => {
  return (
    <div>
        <div class="ticker-title" >
        <span>BidOnBuy.com its a platform to connect buyers and sellers</span>
        <span>BidOnBuy.com its a platform to connect buyers and sellers</span>
        <span>BidOnBuy.com its an platform to connect buyers and sellers</span>
        </div>
        <div className='homeHeading'>
            <NavLink><p className="homeHeading-p">How  It Works</p></NavLink>
            <NavLink><p className="homeHeading-p">Auction</p></NavLink>
            <NavLink><p className="homeHeading-p">Sell your product</p></NavLink>
            <NavLink><p className="homeHeading-p" style={{marginBottom: "0"}}>Services and Support</p></NavLink>
        </div>
        <div className='headerSection'>
            <p className="headerSection-p">100% Safe And Free Auctions</p>
            <div className="allHeaderCard row">
                <HeaderCard serial="1" heading="Register" info="Sign up on our site to start bidding."/>
                <HeaderCard serial="2" heading="Find" info="Find from more than 30,000 products."/>
                <HeaderCard serial="3" heading="Bid" info="Start bidding, bid highest, contact seller"/>
            </div>
        <NavLink to="/signup">
            <button className='searchBtn'>Register to Start Bidding<span style={{marginRight: "20px"}}></span><FaGreaterThan /></button>
        </NavLink>
        </div>
        <section style={{padding: "20px"}}>
            <div>
            <h1 className="popularBidding-h1">Popular Biddings</h1>
            <NavLink className ="bsplay" to="/"><i class="fa-solid fa-play fa-2xl"></i></NavLink>
            </div>
            <div className="row" style={{display: "flex", justifyContent: "space-around"}}>
                <ProductCard key="1" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
                <ProductCard key="2" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
                <ProductCard key="3" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
                <ProductCard key="4" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
            </div>
        </section>
        <div className='sellWithUs'>
            <img src="/images/layered.svg" alt="layered imgage"style={{width: "100%"}}/>
            <h3>Sell With Us</h3>
            <p>Lörem ipsum kontral ninat där andrafiering teravis. Bioska poligram. Dår kontradat liksom väliga, un oaktat dingar. Dosk niligen till prende, prenyn supravision. Loba renas liksom dedån i ankarbarn. 
                Fahönyren nodände. Spegt semiska och nymåktigt. Anter spevåde fälingar: spedat räns. Muska ira seminade våtonat. Onoren eurobävning ser. 
                Muska terasade gekåssa. Mining rev, och nenas, ekartad. Soska mar i kvasigisk. Har tev segt. Divisade autogt plus fydöhet presk. 
                Prektiga relig biporade. Monebel gerade. Prekrogehet sovår farade gagedås. Snurrmästare bilanyl benat antest. Krorat euska suprakemi. 
                Multina ontofiering, i ovände, och reana nefyfan. Stenonådat visogt. Popung antenar respektive div i realaskapet fävanat.
            </p>
            <ul>
                <li><span>✓</span>No Hidden Charge</li>
                <li><span>✓</span>24 X 7 support</li>
                <li><span>✓</span>Access to over 175,000 products</li>
            </ul>
            <button className='getStartedBtn'>Get Started</button>
        </div>
        <section style={{padding: "20px"}}>
            <h1 style={{fontWeight: "700",fontSize: "32px", color: "#0457D4", paddingLeft: "2.3rem" , display: "inline"}}>BidOnBuy Selects</h1>            
            <div className="row" style={{display: "flex", justifyContent: "space-around"}}>
                <ProductCard key="1" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
                <ProductCard key="2" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
                <ProductCard key="3" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
                <ProductCard key="4" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
            </div>
        </section>
        <section style={{padding: "20px"}}>
            <h1 style={{fontWeight: "700",fontSize: "32px", color: "#0457D4", paddingLeft: "2.3rem" , display: "inline"}}>New Arrivals</h1>            
            <div className="row" style={{display: "flex", justifyContent: "space-around"}}>
                <ProductCard key="1" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
                <ProductCard key="2" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
                <ProductCard key="3" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
                <ProductCard key="4" src = "/images/washingMachine.png" title="Samsung Washing Machine" currentBid="₹ 8000.00" location="Bangalore"/>
            </div>
        </section>
        <div className='account text-center  border-top'>
        <h3  style={{paddingBottom: "20px", paddingTop: "8px"}}>Follow Us</h3>
        <div style={{paddingBottom: "20px"}}>
            <NavLink className="px-3"><img src="/images/instagram_icon.svg"/></NavLink>
            <NavLink className="px-3"><img src="/images/facebook_icon.svg"/></NavLink>
            <NavLink className="px-3"><img src="/images/linkedIn_icon.svg"/></NavLink>
        </div>
    </div>
        <Footer />
    </div>
  )
}

export default Home