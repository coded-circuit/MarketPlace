const express = require('express');
const {Wishlist} = require('../models/wishlist');
const {Product} = require('../models/product');
const {User} = require('../models/user');
const router = express.Router();

router.post('/', async (req,res)=>{
    try{
        const {user_id,product_id} = req.body;
        if (!user_id || !product_id) return res.status(400).json({ msg: 'user_id and product_id are required' });
        const result = await Wishlist.create({
            user_id:body.user_id,
            product_id:body.product_id,
        })
        return res.json({msg:"product added to wishlist",data:result})
    }
    catch(err){
        return res.json({msg:"Error",error:err.message})
    }
})
router.delete('/', async (req,res)=>{
    try{
        await Wishlist.findOneAndDelete({user_id,product_id});
        return res.json({msg:"product removed from wishlist",data:result})
    }
    catch(err){
        return res.json({msg:"Error",error:err.message})
    }
})
//Get a specific user's wishlist
router.get('/', async (req,res)=>{
    try{
        const {userId} = req.query;
        if(!user_id) return res.json({msg:"User ID is required"})
        const products = await Wishlist.find({user_id:user_id})
        .populate({
            path:'product_id',
            select:'title price category img_url location created_at,seller_id'
        })
        .populate({
            path:'seller_id',
            select:'name username email phone location'
        })
        return res.json({msg:"wishlist fetched successfully",data:products})
    }
    catch(err){
        return res.json({msg:"Error",error:err.message})
    }
})

module.exports = router;