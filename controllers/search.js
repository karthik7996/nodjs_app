const Product = require('../models/Product');

exports.searchAndRefine = async (req, res) => {
    try {
      const page = parseInt(req.query.page) -1 || 0;
      const limit = 4;
      const search = req.query.search ? 
      {
        productName:{
        $regex: req.query.search,
        $options: "i",
      },
    }:{}; 
      const sort = req.query.sort || "year";
      const category = req.query.category ? 
      {
        mainCategory:{
          $regex: req.query.category,
          $options: "i",
      },
    } : {};
      const subCategory = req.query.subCategory  ? 
      {
        subCategory:{
          $regex: req.query.subCategory,
          $options: "i",
      },
    } : {};
    let year = req.query.year ? 
    {
      year:{
        $eq: 0
    },
  } : {};
  if (req.query.year==99){
    year ={
      year:{
        "$gt": 0
      }
   }
  }
      const product = await Product.find({$and:[{...search},{...category},{...subCategory},{...year}]});
      return res.status(200).json(
        product
      )  }
    catch (err) {
      console.log(err)
    }
  }
  