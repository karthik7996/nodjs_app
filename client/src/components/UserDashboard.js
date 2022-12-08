import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment';
import isEmpty from 'validator/lib/isEmpty';
import { createCategory, getCategories } from '../api/category'
import { createProduct, getUserProduct, deleteProduct, updateProduct } from '../api/product'
import { showErrorMessage, showSuccessMessage } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import Alert from './Alert';
import {getLocalStorage} from "../helpers/localStorage"
import {MdDashboard} from "react-icons/md"

const UserDashboard = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [category , setCategory] = useState('')
  const [categories, setCategories] = useState('')
  const [products, setProduct] = useState('')

  const [productData, setProductData] = useState({
    productImage: null,
    productName: '',
    productDescription: '',
    productPrice: '',
    productCategory: '',
    productQuantity: '',
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
        setErrorMessage(err.response.data.error);
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

  useEffect(() => {
    loadProducts()
  }, [loading])

  const loadProducts = async () => {
    await getUserProduct()
    .then((response) => {
      setProduct(response.data)
      console.log('products', response.data)
    }
    )
    .catch((error) => {
      console.log('loadProducts error', error)
    }
    )
  }

  const destroy = async (productId) => {
    setLoading(true)
    await deleteProduct(productId)
    .then((response) => {
      setLoading(false)
      console.log('deleteProduct response', response)
    })
    .catch((error) => {
      setLoading(false)
      console.log('deleteProduct error', error)
    })
  }

  const update = async (productId) => {
    setLoading(true)
    await updateProduct(productId)
    .then((response) => {
      setLoading(false)
      console.log('updateProduct response', response)
    })
    .catch((error) => {
      setLoading(false)
      console.log('updateProduct error', error)
    })
  }


  const showHeader = () => (
    <div className="bg-light text-black pl-5 pt-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h1>
            <i class="fa-solid pl-5" style={{fontFamily: "'Poppins', sans-serif"}}><MdDashboard className='mr-3 rotate'/>Dashboard</i>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )

  const showActionBtns = () => (
    <div className="bg-light my-2">
      <div className="container">
        <div className="row pb3">
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

  const showProductModal = () => (
   
    <div className="modal fade" id="addProductModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
     {getLocalStorage("user").accStatus }? <Alert alert = 'Please verify from profile section before you upload any product' />: {
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
                <label htmlFor="recipient-name" className="col-form-label">Product Year:</label>
                <input name='year' value={year} onChange={handleProductChange} type="number" min='0' className="form-control" id="recipient-name" />
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
    }
    </div>
    
  )

  const showProducts = () => (
    <div className="row">
      <div className="col-md-12">
        <h2 className="text-center">Total {products.length} products</h2>
        <hr />
        { products && products.map((p, i) => (
          <div className="card mb-3" key={i}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src= {require(`./uploads/${p.fileName}`)} className="card-img" alt={p.productName} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{p.productName}</h5>
                  <p className="card-text">{p.productDescription}</p>
                  <p className="card-text"><small className="text-muted">Category: {p.productCategory.name}</small></p>
                  <p className="card-text"><small className="text-muted">year: {p.year}</small></p>
                  <p className="card-text"><small className="text-muted">Minimum Bid: ₹{p.productPrice}</small></p>
                  <p className="card-text"><small className="text-muted">Added on: {moment(p.createdAt).fromNow()}</small></p>
                  <p className="card-text"><small className="text-muted">Last updated: {moment(p.updatedAt).fromNow()}</small></p>
                  <Link to={`/admin/product/update/${p._id}`} className="btn btn-outline-warning btn-sm mr-2">Update</Link>
                  <button onClick={() => destroy(p._id)} className="btn btn-outline-danger btn-sm">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section>
      {showHeader()}
      {errorMessage && <Alert alert = {errorMessage}/>}
      {showActionBtns()}
      {/* {showCategoryModal()} */}
      {showProductModal()}
      {showProducts()}

    </section>
  )
}

export default UserDashboard