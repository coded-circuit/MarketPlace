const express = require('express');
const {User} = require('../models/user');
const router = express.Router();
const {handleUserSignUp} = require('../controllers/user')
router.get('/',async (req,res)=>{
	try{
		const result = await User.find({});
		return res.json({msg:"Users fetched Successfully",data:result});
	}
	catch(err){
		return res.status(500).json({msg:"Error",error:err});
	}
})
router.get('/:id',async (req,res)=>{
	try{
		const result = await User.findById(req.params.id);
		return res.json({msg:"User fetched Successfully",data:result});
	}
	catch(err){
		return res.status(500).json({msg:"Error",error:err});
	}
})
router.post('/',handleUserSignUp);
router.post('/login',handleUserLogin);

module.exports = router;