const mongoose = require('mongoose');

//Wishlist Schema
const wishlistSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    product_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true,
    }
},{timestamps:{createdAt:'created_at',updatedAt:'updated_at'}})

const Wishlist = mongoose.model('Wishlist',wishlistSchema);
module.exports = {Wishlist};