const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    userId: {type: ObjectId, required: true},
    images: [
        {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },]
    ,
    productName: { type: String, required: true, trim: true},
    bidder:[{
        bidderId: ObjectId,
        bidAmount: Number,
    }],
    // productPrice: { type: Number, required: true },
    productDescription: { type: String, required: true, trim: true},
    state: { type: String, required: true },
    city: { type: String, required: true },
    mainCategory: { type: String, required: true },
    subCategory: {type: String, require: true},
    year: { type: Number, required: true, minimum: 0 }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;