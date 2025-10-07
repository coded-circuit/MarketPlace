const express = require('express');
const {User} = require('../models/user');
const router = express.Router();
const {handleUserSignUp,handleUserLogin,handleUserLogout} = require('../controllers/user');
const { restictToLoggedInUserOnly } = require('../middlewares/auth');
const { getUser } = require('../service/auth');
//Private Routes

//******We should comment this api out because we shouldn't give this credential to the users, it is there at present for development purpose only...**********
router.get('/',restictToLoggedInUserOnly,async (req,res)=>{
	try{
		const result = await User.find({});
		return res.json({msg:"Users fetched Successfully",data:result});
	}
	catch(err){
		return res.status(500).json({msg:"Error",error:err});
	}
})
router.get('/:id',restictToLoggedInUserOnly,async (req,res)=>{
	try{
		if(req.params.id == 'me'){
			const uid = req.cookies.uid;
			const user = getUser(uid);
			if (!user) {
				return res.status(401).json({msg: "Session expired or user not found"});
			}
			const result = await User.findById(user._id);
			if (!result) {
				return res.status(404).json({msg: "User not found in database"});
			}
			return res.json({msg:"User fetched Successfully",data:result});
		}
	}
	catch(err){
		return res.status(500).json({msg:"Error",error:err});
	}
})
//Public Routes
router.post('/',handleUserSignUp);
router.post('/login',handleUserLogin);
router.post('/logout',handleUserLogout);

module.exports = router;