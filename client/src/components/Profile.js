import React, {useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {profileUpdate } from '../api/auth';
import isEmpty from 'validator/lib/isEmpty';
import {getLocalStorage} from "../helpers/localStorage"
import {setLocalStorage} from "../helpers/localStorage"

const AdminDashboard = () => {

    const [loading, setLoading] = useState(false);
  
    const [category , setCategory] = useState('')
    const [categories, setCategories] = useState('')
  
    const [productData, setProductData] = useState({
      productImage: null,
      productName: '',
      productDescription: '',
      productPrice: '',
      productCategory: '',
      year: '',
    })
  
    const {productImage, productName, productDescription, productPrice, productCategory, year} = productData;
  
    const handleProductImage = (e) => {
      console.log(e.target.files[0])
      setProductData({...productData, productImage: e.target.files[0]})
    }
  
    const handleProductChange = (e) => {
      setProductData({...productData, [e.target.name]: e.target.value})
    }
  
    const handleProductSubmit = (e) => {
      e.preventDefault();
      if (productImage === null || isEmpty(productName) || isEmpty(productDescription) || isEmpty(productPrice) || isEmpty(productCategory) || isEmpty(year)) {
        console.log('Please fill all fields')
      } else {
        let formData = new FormData();
        formData.append('productImage', productImage);
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('productPrice', productPrice);
        formData.append('productCategory', productCategory);
        formData.append('year', year);
        console.log([...formData])
        createProduct(formData)
        .then(response => {
          setProductData({
            productImage: null,
            productName: '',
            productDescription: '',
            productPrice: '',
            productCategory: '',
            year: '',
          })
        })
        .catch(err => {
          console.log(err)
        })      
      }
      console.log(productData)
    }
  
    useEffect(() => {
      loadCategories()
    }, [loading])
  
    const loadCategories = async () => {
      await getCategories()
      .then((response) => {
        setCategories(response.data)
        console.log('categories', response.data)
      }
      )
      .catch((error) => {
        console.log('loadCategories error', error)
      }
      )
    }
  
  
    const handleCategoryChange = (e) => {
      setCategory(e.target.value)
      // console.log(category)
    }
  
    const handleCategorySubmit = (e) => {
      e.preventDefault()
      if (isEmpty(category)) {
        alert('Please enter a category')
      } else {
        const data = { name: category }
        createCategory(data)
          .then(response => {
            setCategory('')
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
        }
  
    }
  
    const showActionBtns = () => (
      <div className="bg-light my-2">
        <div className="container">
          <div className="row pb3">
            <div className="col-md-4 my-1">
              <button className="btn btn-outline-secondary btn-block" data-toggle='modal' data-target='#addCategoryModal'>
                <i className="fas fa-plus-circle"></i> Create Category
              </button>
            </div>
            <div className="col-md-4 my-1">
              <button className="btn btn-outline-warning btn-block" data-toggle='modal' data-target='#addProductModal'>
                <i className="fas fa-plus-circle"></i> Add Product
              </button>
            </div>
            <div className="col-md-4 my-1">
              <button className="btn btn-outline-success btn-block">
                <i className="fa-solid fa-wallet"></i> View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  
    const showCategoryModal = () => (
      <div className="modal fade" id="addCategoryModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
  
            <div className="modal-header bg-info text-white">
              <h5 className="modal-title" id="exampleModalLabel">Add New Category</h5>
              <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">Category Name:</label>
                  <input type="text" className="form-control" id="recipient-name" 
                  name='category' 
                  value={category} 
                  onChange={handleCategoryChange} />
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Add Category</button>
            </div>
  
          </form>
          </div>
        </div> 
      </div>
    )
  
    const showProductModal = () => (
      <div className="modal fade" id="addProductModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          <form onSubmit={handleProductSubmit}>
            <div className="modal-header bg-warning text-white">
              <h5 className="modal-title" id="exampleModalLabel">Add New Product</h5>
              <button type="button" className="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
  
                <div className="form-group mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">Upload Image</label>
                  <input name='productImage'onChange={handleProductImage} class="form-control" type="file" id="formFile"/>
                </div>
  
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">Product Name:</label>
                  <input type="text" name='productName' value={productName} onChange={handleProductChange} className="form-control" id="recipient-name" />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">Product Minimum Bid:</label>
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">₹</span>
                    <input name='productPrice' value={productPrice} onChange={handleProductChange} type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">Product Description:</label>
                  <textarea name='productDescription' value={productDescription} onChange={handleProductChange} type="text" className="form-control" id="recipient-name" rows = '3' ></textarea>
                </div>
                <div className="form-row" id="recipient-name">
                  <div className="form-group col-md-6">
                    <label htmlFor="recipient-name" className="col-form-label">Product Category:</label>
                    <select name='productCategory' onChange={handleProductChange} className="custom-select mr-sm-2">
                      <option value='' selected>Choose Category</option>
                       {
                        categories && categories.map((c, i) => (
                          <option key={i} value={c._id}>{c.name}</option>
                        ))
                       }
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                  <label htmlFor="recipient-name" className="col-form-label">Years Old/New:</label>
                  <input name='year' value={year} onChange={handleProductChange} type="text" placeholder="...years ...months or New" className="form-control" id="recipient-name" />
                </div>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary">Add Product</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    )
  
    return (
      <section>
        {showActionBtns()}
        {showCategoryModal()}
        {showProductModal()}
  
      </section>
    )
  }
const Profile = () => {

  const [isShown,setIsShown] = useState(false) 
  function handleisShown() {
    setIsShown(!isShown)
  }

  const pre_user = getLocalStorage("user");
    const [ user, setUser] = useState({
        name: pre_user.name,
        phoneNr: pre_user.phoneNr,
        address: pre_user.address,
        email: pre_user.email,
        location: pre_user.location,
        })
        console.log(user)
        const handleChange = e => {
          const {name, value} = e.target;
          setUser({...user, [name]: value});
        }
        const PostData = async(e) =>{
            e.preventDefault();
            const {name, phoneNr, address, email, location} = user;
            var str = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
            if(isEmpty(name) || isEmpty(phoneNr) || isEmpty(location)){
              alert('Please fill all required field')
            }
            else if (phoneNr.match(str)){
              const _id = pre_user._id;
              const role = pre_user.role
                const data = {_id,  name, phoneNr, address, email, location}
               profileUpdate(data)
               .then (response => {
                console.log('Axios profile update success', response)
                setLocalStorage("user", {role, ...data});
               })
               .catch(err => {
                console.log('Axios profile update error', err)
              })
            }
        }
  return (
    <>
    <AdminDashboard />
<div className="container rounded bg-white mt-5 mb-5" style={{color: "black", backgroundImage: "-webkit-linear-gradient(65deg, #e7ecfd 45%,#80b3ff 40%)"}}>
    <div className="row">
        <div className="col-md-6">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mb-4" width="200px" src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png" /><span className="fw-bold h1 text-info text-opacity-50" >{user.name}</span><span className="text-black-50 h3">{user.phoneNr}</span></div>
        </div>
        <div className="col-md-6 border-right">
            <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="fw-semibold h2">Profile Settings</h4>
                </div>
                <div className="row">
                    <div className="col-md-12"><label className="labels mb-2 h4">Name**</label><input type="text" className="form-control" placeholder="Full name" name="name" value={user.name} onChange= {handleChange} required/></div></div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels mb-2 h4">Mobile Number**</label><input type="text" className="form-control" placeholder="Enter phone number" name="phoneNr" value={user.phoneNr}  onChange= {handleChange} onClick={() =>document.getElementById("phoneNrValidation").style.display = "none"} required/></div>
                    <p id="phoneNrValidation">Not a valid phone number</p>
                    <div className="col-md-12 mt-2"><label className="labels mb-2 mt-2 h4">Address</label><input type="text" className="form-control" placeholder="Enter complete address" name="address" value={user.address}  onChange= {handleChange} /></div>
                    <div className="col-md-12 mt-2"><label className="labels mb-2 mt-2 h4">Email ID</label><input type="text" className="form-control" placeholder="Enter email id" name="email" value={user.email}  onChange= {handleChange} /></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels mb-2 mt-2 h4">State/Location**</label><input type="text" className="form-control" placeholder="state" name="location" value={user.location} onChange= {handleChange} required/></div>
                </div>
                <div className="mt-5 text-center"><button className="btn btn-primary profile-button fw-bold px-4" type="button" onClick={PostData}>Save Profile</button></div>
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default Profile