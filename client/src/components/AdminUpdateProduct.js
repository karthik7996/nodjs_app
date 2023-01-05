import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../api/product";
import { createCategory, getCategories } from "../api/category";
import isEmpty from "validator/lib/isEmpty";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
const AdminUpdateProduct = ({ match }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [alert, setAlert] = useState(null);

  const showAlert = (messsage, type) => {
    setAlert({
      msg: messsage,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  const [productData, setProductData] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    productQuantity: "",
  });

  const [categories, setCategories] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();
  }, [loading]);
  const loadCategories = async () => {
    await getCategories()
      .then((response) => {
        setCategories(response.data);
        console.log("categories", response.data);
      })
      .catch((error) => {
        console.log("loadCategories error", error);
      });
  };

  const handleProductImage = (e) => {
    // setProductData({ ...productData, productImage: e.target.files[0] });
    const imageMimeType = /image\/(png|jpg|jpeg|jfif|webp)/i;
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach((file) => {
      if (!file.type.match(imageMimeType)) {
        alert("Image type is not valid");
        e.target.value = "";
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
    console.log(images);
  };

  const handleProductChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleProductSubmit = (e) => {
    console.log(productData);
    e.preventDefault();
    setLoading(true);
    if (
      images.length == 0 ||
      isEmpty(productData.productName) ||
      isEmpty(productData.productDescription) ||
      isEmpty(productData.productCategory) ||
      isEmpty(productData.productPrice) ||
      isEmpty(productData.productQuantity)
    ) {
      showAlert("Please fill all fields", "danger");
    } else {
      let productImage = [];
      console.log(images);
      images.forEach((i) => {
        productImage.push(i);
      });
      console.log("chala ha");
      let finalProductData = {
        productName: productData.productName,
        productDescription: productData.productDescription,
        productPrice: productData.productPrice,
        productCategory: productData.productCategory,
        productQuantity: productData.productQuantity,
        productImage,
      };
      updateProduct(productId, finalProductData)
        .then((response) => {
          setProductData({
            productName: "",
            productDescription: "",
            productPrice: "",
            productCategory: "",
            productQuantity: "",
          });
          setLoading(false);
          navigate("/");
        })
        .catch((err) => {
          showAlert(err.response.data.error, "danger");
        });
    }
  };

  return (
    <div className="container">
      <Alert alert={alert} />

      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Update Product</h1>
          <hr />
          {loading ? (
            <div
              className="spinner-border  m-5 d-1"
              style={{ width: "10vmax", height: "10vmax" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <form onSubmit={handleProductSubmit}>
              <div className="form-group">
                <label className="text-muted">Product Image</label>
                <input
                  type="file"
                  name="productImage"
                  onChange={handleProductImage}
                  className="form-control"
                  accept="image/*"
                  multiple
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Product Name</label>
                <input
                  type="text"
                  name="productName"
                  onChange={handleProductChange}
                  className="form-control"
                  value={productData.productName}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Product Description</label>
                <textarea
                  type="text"
                  name="productDescription"
                  onChange={handleProductChange}
                  className="form-control"
                  value={productData.productDescription}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Product Price</label>
                <input
                  type="number"
                  name="productPrice"
                  onChange={handleProductChange}
                  className="form-control"
                  value={productData.productPrice}
                />
              </div>
              <div className="form-group">
                <label className="text-muted">Product Category</label>
                <select
                  name="productCategory"
                  onChange={handleProductChange}
                  className="form-control"
                  value={productData.productCategory}
                >
                  <option>Please select</option>
                  <option>electronics</option>
                  <option>apparels</option>
                  <option>home</option>
                </select>
              </div>
              <div className="form-group">
                <label className="text-muted">Product Quantity</label>
                <input
                  type="number"
                  name="productQuantity"
                  onChange={handleProductChange}
                  className="form-control"
                  value={productData.productQuantity}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Product
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateProduct;