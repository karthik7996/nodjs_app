const Category = require('../models/category');
const Product = require('../models/Product');

exports.create = async (req, res) => {
  console.log(req.body);
  const { name } = req.body;

  try {

    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      return res.status(400).json({
        error: 'Category already exist',
      });
    }

    const newCategory =  new Category({ name });
    await newCategory.save();
    res.json({
      message: 'Category created',
    });
  } catch (error) {
    console.log('createCategory error', error)
    res.status(500).json({
      error: 'Error saving category in database. Try again',
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.log('readAllCategories error', error)
    res.status(500).json({
      error: 'Error reading categories from database. Try again',
    });
  }
};

exports.readProducts = async (req, res) => {
  const {categoryName} = req.params
  try {
    const products = await Product.find({}).populate('productCategory', 'name');
    const selectedProducts = []
    products.forEach(function (product){
      if (product.productCategory.name == categoryName){
          selectedProducts.push(product)
      }
    })

    res.json(
      selectedProducts
    );
  } catch (error) {
    console.log('read' + categoryName+ 'Categories error', error)
    res.status(500).json({
      error: 'Error reading categories from database. Try again',
    });
  }
};