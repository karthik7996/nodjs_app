const Product = require('../models/Product');

exports.searchAndRefine = async (req, res) => {
    try {
      const currentPage = Number(req.query.page) || 1;
      const limit = 3;
      const skip = limit*(currentPage-1);
      const state = req.query.location ? {
        state:{
          $regex: req.query.location,
        $options: "i",
        }
      }: {};
      const city = req.query.location ? {
        city:{
          $regex: req.query.location,
        $options: "i",
        }
      }: {};
      const search = req.query.search ? 
      {
        productName:{
        $regex: req.query.search,
        $options: "i",
      },
    }:{}; 
      const sort = req.query.sort || "asc";
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
      const product = await Product.find({$and:[{...search},{...category},{...subCategory},{...year},{ $or: [{...state}, {...city}] }]}).sort({year: sort}).limit(limit).skip(skip);
      const productCount = await Product.find({$and:[{...search},{...category},{...subCategory},{...year},{ $or: [{...state}, {...city}] }]}).countDocuments()
      return res.status(200).json({
        product,
        productCount
      }
      )  }
    catch (err) {
      console.log(err)
    }
  }
  exports.readFourTop = async (req, res) => {

    try {
      let products = await Product.find({}).limit(4);
      res.status(200).json(
        products
      )
    }
    catch (error) {
      console.log(error)
    }
  
  }