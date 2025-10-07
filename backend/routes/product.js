const express = require('express'); 
const {Product} = require('../models/product');
const { restictToLoggedInUserOnly } = require('../middlewares/auth');
const router = express.Router();
//Public Routes
router.get('/',async (req,res)=>{
    try{
        const result = await Product.find({});
        return res.json({msg:"products fetched Successfully",data:result});
    }
    catch(err){
        return res.status(500).json({msg:"Error",error:err});
    }
})
router.get('/:id', async (req,res)=>{
    try{
        const result = await Product.findById(req.params.id).populate({
            path:'seller_id',
            select:'name username email phone location'
        })
        return res.json({msg:"Product fetched successfully",data:result})
    }
    catch(e){
        return res.json({msg:"Error",error:e.message})
    }
})
router.get('/category/:category', async(req,res)=>{  
    try{
        const categoryName = req.params.category;
        const result = await Product.find({category:categoryName})
        .collation({locale:'en',strength:2}) //to ignore case sensitivity
        return res.json({msg:"Products fetched successfully",data:result})
    }
    catch(e){
        return res.json({msg:"error",error:e.message})
    }
})
//Protected Routes
router.post('/', restictToLoggedInUserOnly,async (req,res)=>{
    try{
        const body = req.body;
        const result = await Product.create({
            title:body.title,
            description:body.description,
            price:body.price,
            category:body.category,
            img_url:body.img_url,
            seller_id:body.seller_id,
            location:body.location,
            is_sold:body.is_sold,
        })
        console.log(result);
        return res.json({msg:"Product listed Successfully"})
    }
    catch(err){
        return res.json({msg:"Error",error:err.message})
    }
})
router.patch('/:id',restictToLoggedInUserOnly, async(req,res)=>{
    try{
        const result = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.json({msg: "Product updated"})
    }
    catch(e){
        return res.json({msg:"error",error:e.message})
    }
})
router.delete('/:id',restictToLoggedInUserOnly, async(req,res)=>{
    try{
        const result = await Product.findByIdAndDelete(req.params.id);
        return res.json({msg: "Product deleted"})
    }
    catch(e){
        return res.json({msg:"error",error:e.message})
    }
})

module.exports = router;