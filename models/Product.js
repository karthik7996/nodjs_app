const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const ProductSchema = mongoose.Schema({
    userId: {type: ObjectId, required: true},
    fileName: { type: String, required: true },
    productName: { type: String, required: true, trim: true},
    bidder:[{
        bidderId: ObjectId,
        bidAmount: Number,
    }],
    productPrice: { type: Number, required: true },
    productDescription: { type: String, required: true, trim: true},
    productCategory: { type: ObjectId, ref:'Category', required: true },
    year: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;