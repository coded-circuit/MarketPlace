const mongoose = require('mongoose');

//User Schema

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        trim:true, //removes whitespace
        unique:true,
        index:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        
    },
    location:{
        type:String,
        required:true,
        trim:true,
    }
    

},{timestamps:{createdAt:'created_at',updatedAt: false}})



const User = mongoose.model('User',userSchema);
module.exports = {User};