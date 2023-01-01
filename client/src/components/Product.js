import React, {useEffect, useState} from 'react'
import {useNavigate, NavLink, useLocation} from "react-router-dom"
import ProductCard from './ProductCard'
import {CategoryData} from "../helpers/categoryData"
import { CgDetailsLess } from "react-icons/cg";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { searchAndRefine } from "../api/product";

const Product = () => {
  const [mainCategory, setMainCategory] = useState("All")
  const [disSubCategory, setSubArrCategory] = useState([])
  const [subCategory, setSubCategory] = useState("")
  const [products, setProduct] = useState('')
  const [showFilter, setShowFilter] = useState(window.innerWidth)
  const navigate = useNavigate();

const query = new URLSearchParams(useLocation().search);
const search = query.get("search") || "";

console.log("nadeem", search)
useEffect(() => {
  searchProdct()
}, [search,mainCategory, subCategory])
const searchProdct=()=>{
    searchAndRefine(search,mainCategory,subCategory)
    .then((response) => {
      setProduct(response.data)
      console.log(response.data)
    }
    )
    .catch((error) => {
      console.log('loadproduct error', error)
    }
    )
  }
  useEffect(()=>{if(window.innerWidth<576){
    setShowFilter(!showFilter)
  }},[])
  const handleMajorCategoryChange=(index) =>{
    if (index.target.value === ""){
      setMainCategory("")
      setSubArrCategory([])
    }
    else{
      setMainCategory(CategoryData[index.target.value].title)
      setSubArrCategory(CategoryData[index.target.value].subNav)
      setSubCategory("")
    }
  }
  const handleSubCategoryChange=(e)=>{
    setSubCategory(e.target.value)
  }
  
  return (
    <div>
        <div className='homeHeading'>
            <NavLink><p className="homeHeading-p">How  It Works</p></NavLink>
            <NavLink><p className="homeHeading-p">Auction</p></NavLink>
            <NavLink><p className="homeHeading-p">Sell your product</p></NavLink>
            <NavLink><p className="homeHeading-p pt-3" style={{marginBottom: "0"}}>Services and Support</p></NavLink>
        </div>
        {window.innerWidth<576 && <div><p className='mr-5 h2 mt-4 ml-5' onClick={()=>setShowFilter(!showFilter)}><CgDetailsLess className='mr-4'/>Filter | Refine</p></div>}
        <div className='contatiner'>
        <div className='row'>
        {showFilter &&
          <div className='col-12 col-sm-3 border mt-4 rounded pb-3'>
          {/* {!showFilter && <p>X</p>} */}
              <p className='border-bottom h1 p-3'>Filter</p>
              <p className='pl-3'>Category</p>
              <select name="productCategory" className="custom-select mr-sm-2 ml-2" onChange={handleMajorCategoryChange}>
                <option  value="" >All Products</option>
                {CategoryData && CategoryData.map((category,index)=>{
                  return( <option value={index}>{category.title}</option>)
                })}
                </select>
                {disSubCategory.length>0 &&  <select name="subCategory" className="custom-select mr-sm-2 mt-3 ml-2" onChange={handleSubCategoryChange}>
                <option value="" selected>All Sub Category</option>
                {disSubCategory.map((subCategory,index)=>{
                  return( <option key={index} value={subCategory.title}>{subCategory.title}</option>)
                })} 
                </select>
                }
                <p className='pl-3 pt-3'>Fresh | Old</p>
                <select
                  className="custom-select mr-sm-2 ml-2"
                  id="usedAndNew"
                > <option value="" selected>Both</option>
                  <option value="new">Fresh</option>
                  <option value="old">Old</option>
                </select>
                <p className='border-top border-bottom h1 p-3 mt-5'>Refine By</p>
                {disSubCategory.length>0 && subCategory=="" &&         
                <><p className='pl-3 mt-2'>Sub Category</p>
                <select name="subCategory" className="custom-select mr-sm-2 mt-1 ml-2" >
                <option value="" selected>Random</option>
                {disSubCategory.map((subCategory,index)=>{
                  return( <option key={index} value={subCategory.title}>{subCategory.title}</option>)
                })} 
                </select>
                </>
                }                
                <p className='pl-3 mt-4'>Year</p>
                  <select className='custom-select mr-sm-2 ml-2'>
                    <option value="">Random</option>
                    <option>Fresh top</option>
                    <option>Old top</option>
                  </select>
                  
          </div>
        }
          <div className="col-sm-9 pl-5" >
          <div className="row ">
        { products && products.map((p, i) => (
          <div style={{position:'relative'}} className='productCard border border-white border-top-0'>
          <img src= {p.images[0].url} className="card-img" alt={p.productName} />
            <div style={{padding: "0 10px"}}>
              <h3 className='mt-3'>{p.productName}</h3>
              {/* <p>Current Bid: <span className='currentBid'>Rs {p.productPrice}</span></p> */}
              {/* <p className='descP'>{p.productDescription}</p> */}
              <p className='mt-3'>{p.subCategory}</p>
            </div>
            <div style={{margin: "10px", position:'absolute', bottom:'5px'}}>
                <button className="scale" onClick={()=>navigate(`/singleproduct/${p._id}`)}>Bid higher</button> 
                <OverlayTrigger 
        delay={{ hide: 450, show: 300 }}
        overlay={(props) => (
          <Tooltip {...props} > 
            {p.productDescription}
          </Tooltip>
        )}
        placement="bottom"
      ><img src="images/i_icon.svg" className="info scale" style={{position:'absolute', right:'-142px'}}/>
      </OverlayTrigger>
                
            </div>
          </div>
        ))}
    </div>          </div>
          </div>
        </div>
        
    </div>
  )
}

export default Product