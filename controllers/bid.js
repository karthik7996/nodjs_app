const Product = require('../models/Product');
const User = require('../models/user')

exports.placeBid = async (req, res) => {
    console.log(req.body)
    const { productId } = req.params
    const {_id} = req.user
    const {amount} = req.body
    console.log(_id,amount)
    try {
      let product = await Product.findOneAndUpdate({_id: productId},{$push: {bidder: {bidderId: _id, bidAmount: amount}}})
      let user = await User.findOneAndUpdate({_id},{$push: {onBid: {productId: productId, bidAmount: amount}}})
      console.log(product)
      console.log(user)
      res.status(200).json({
            message: 'Bid successfull'
        })
    }
    catch (error) {
      console.log(error)
    }
  
  }
exports.readUserBid = async (req, res) => {
  const {_id} = req.user
  try{
    const bidProducts = [];
    let user = await User.findOne({_id});
    for( const bidItem of user.onBid) {
      const product = await Product.findOne({_id:bidItem.productId}).populate('productCategory', 'name');
      const item = {
          productId: bidItem.productId,
          productName: product.productName,
          fileName: product.fileName,
          bidAmount: bidItem.bidAmount,
      }
          bidProducts.push(item);
    }
    console.log(bidProducts)
    res.status(200).json({
       message: 'your ongoing bid',
       bidProducts
    })

  }
  catch (error) {
    console.log(error)
  }
}