const Product = require('../models/Product');
const User = require('../models/user')

exports.placeBid = async (req, res) => {
    console.log(req.body)
    const { productId } = req.params
    const {_id} = req.user
    const {amount} = req.body
    console.log(_id,amount)
    try {
        // checking user account status
      const status = await User.findOne({_id})
        if (!status.accStatus){
          return res.status(400).json({
            error: 'Please verify from profile section before you Bid any product'
          });
        }

      // code for user already bided
      const userAlreadyBid = await Product.findOne({_id: productId}).select({ bidder: {$elemMatch: {bidderId: _id}}});
        if(userAlreadyBid.bidder.length ===1){
        //   const findproduct_ = await Product.findOne({_id: productId})
        //   let max1 = 0
        //   console.log(findproduct_)
        //   findproduct_.bidder.forEach(function (arrayItem) {
        //     if (max1 < arrayItem.bidAmount){
        //         max1 = arrayItem.bidAmount
        //     }   
        // })
        // console.log(max1)
        // if (amount<= max1){
        //   return res.status(400).json({
        //     error: 'Your Bid amount must be greater than previous Bidder'
        //   });
        // }
          userAlreadyBid.bidder[0].bidAmount = amount;
          await userAlreadyBid.save();
          let user = await User.findOne({_id}).select({ onBid: {$elemMatch: {productId: productId}}});
          user.onBid[0].bidAmount = amount;
          await user.save();
          res.status(200).json({
            message: 'Bid Amount successfull updated'
        })
        return ;
      }
      // when user first time biding the product
      // finding maximum bid
      // const findproduct = await Product.findOne({_id: productId})
    //   let max = 0
    //   findproduct.bidder.forEach(function (arrayItem) {
    //     if (max < arrayItem.bidAmount){
    //         max = arrayItem.bidAmount
    //     }
    // })
    // console.log(max)
    // if (amount<= max){
    //   return res.status(400).json({
    //     error: 'Your Bid amount must be greater than previous Bidder'
    //   });
    // }
    // this code execute when amount is greater than previous Bidder
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
          images: product.images,
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

exports.acceptBid = async (req, res) => {
  const bidderId = req.body[0];
  const productId = req.body[1];
  const {_id} = req.user
  const product = await Product.findOne({_id: productId})
  let user = await User.findOne({_id:bidderId}).select({ notification: {$elemMatch: {productId: productId}}});
  if(user.notification.length ===1){
  return res.status(200).json({
    message: 'Acceptance message already sent to this Bidder'
  })
  }
  await User.findOneAndUpdate({_id: bidderId},{$push: {notification: {sellerId: _id, productId: productId,productName: product.productName}}})
  res.status(200).json({
    message: 'Bid acceptance message sent successfully to Bidder'
})
}
exports.readNotification = async (req, res) => {
  const {_id} = req.user;
  const user = await User.findOne({_id})
  const notification = user.notification;
  console.log(user)
  res.status(200).json({
    notification
  })
}