const mongoose= require('mongoose');

//Product Schema 
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    category:{
        type:String,
        required:true,
        lowercase:true,
    },
    img_url:{
        type:String,
        trim:true,
    },
    seller_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true,
    },
    location:{
        type:String,
        required:true,
        trim:true,
    },
    is_sold:{
        type:Boolean,
        default:false,
    }
},{timestamps:{createdAt:'created_at',updatedAt: 'updated_at'}})

//Giving product location same as seller location
productSchema.pre('save', async function(next){
    try{
        if(this.seller_id){
            const User = mongoose.model('User');
            const seller = await User.findById(this.seller_id).select('location');
            if(seller && seller.location){
                this.location = seller.location;
            }
        }
        next();
    }
    catch(err){
        next(err);
    }
})

const Product = mongoose.model('Product',productSchema);

module.exports = {Product};