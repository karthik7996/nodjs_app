const Product = require('../models/Product');
const User = require('../models/user')
const cloudinary = require("cloudinary");

exports.create = async (req, res) => {
  try {
    const { _id } = req.user;
console.log(req.body)
    const user = await User.findOne({ _id });
    if (!user.accStatus) {
      return res.status(400).json({
        error:
          "Please verify from profile section before you upload any product",
      });
    }

    let images = [];
    if (typeof req.body.productImage === "string") {
      images.push(req.body.productImage);
    } else {
      images = req.body.productImage;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "productImages",
      });

      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }


    const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      year,
    } = req.body;


    let product = new Product();
    product.userId = _id;
    product.images = imagesLink;
    product.productName = productName;
    product.productDescription = productDescription;
    product.productPrice = productPrice;
    product.productCategory = productCategory;
    product.year = year;
    await product.save().then((response) => {
      User.findOneAndUpdate(
        { _id },
        { $push: { products: response._id } },
        function (err, foundUser) {
          if (err) console.log(err);
        }
      );
      res.status(201).json({
        message: "Product created successfully",
        product: response,
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

//backup code
// exports.create = async (req, res) => {

//   console.log( 'req.file', req.file)
//   console.log(req.body)
//   console.log(req.user)
//   const {_id} = req.user;

//   const { filename } = req.file
  
//   const { productName, productDescription, productPrice, productCategory, year } = req.body

//   try {
//     const user = await User.findOne({ _id});
//     if (!user.accStatus) {
//       return res.status(400).json({
//         error: 'Please verify from profile section before you upload any product',
//       });
//     }
//     let product = new Product()
//     product.userId = _id
//     product.fileName = filename
//     product.productName = productName
//     product.productDescription = productDescription
//     product.productPrice = productPrice
//     product.productCategory = productCategory
//     product.year = year
//     await product.save()
//     .then(response => {
//       User.findOneAndUpdate({_id},{$push: {products: response._id}}, function(err, foundUser){
//         if(err)
//             console.log(err);
//     });
//       res.status(201).json({
//         message: 'Product created successfully',
//         product: response
//       })
//     })
    
//   } catch (error) {
//     console.log(error)
//   }


// }

exports.readAll = async (req, res) => {

  try {
    let products = await Product.find({}).populate('productCategory', 'name')
    res.status(200).json(
      products
    )
  }
  catch (error) {
    console.log(error)
  }

}
exports.readSingle = async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    let product = await Product.findOne({_id: id}).populate('productCategory', 'name')
    console.log(product)
    res.status(200).json(
      product
    )
  }
  catch (error) {
    console.log(error)
  }

}

exports.readCurrentUserProduct = async (req, res) => {
  try {
    const {_id} = req.user
    let products = await Product.find({userId: _id}).populate('productCategory', 'name')
    res.status(200).json(
      products
    )
  }
  catch (error) {
    console.log(error)
  }

}


exports.delete = async (req, res) => {
  const { id } = req.params
  try {
    const users =  await User.find();
    users.map(async (user)=>{
    const bidProduct = user.onBid.filter(products=>products.productId != id)
      user.onBid = bidProduct
      await user.save();
    })
    let product = await
      Product
        .findByIdAndDelete(id)
        .then(response => {
          res.status(200).json({
            message: 'Product deleted successfully',
            product: response
          })
        }
        )
  }
  catch (error) {
    console.log(error)
  }
}


exports.update = async (req, res) => {
  const { id } = req.params
  const { productName, productDescription, productPrice, productCategory, year } = req.body

  try {
    let product = await Product
      .findById
      (productId)
      .then(response => {
        response.productName = productName
        response.productDescription = productDescription
        response.productPrice = productPrice
        response.productCategory = productCategory
        response.year = year
        response.save()
        res.status(200).json({
          message: 'Product updated successfully',
          product: response
        })
      }
      )
  }
  catch (error) {
    console.log(error)
  }
}