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
      const category = req.query.category || "";
      const subCategory = req.query.subCategory || "";
      console.log("category:", category)
      console.log("subCategory:",subCategory)
      const product = await Product.find({...search});
      return res.status(200).json(
        product
      )  }
    catch (err) {
      console.log(err)
    }
  }
  