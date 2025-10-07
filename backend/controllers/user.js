const { User } = require('../models/user');
const {v4:uuidv4} = require('uuid')
const {setUser,getUser} = require('../service/auth')
const handleUserSignUp = async (req, res) => {
	try {
		console.log('Received request body:', req.body);
		
		const body = req.body;
		const result = await User.create({
			name: body.name,
			username: body.username,
			email: body.email,
			password: body.password,
			phone: body.phone,
			location: body.location,
		});
		
		console.log('User created successfully:', result);
		return res.status(201).json({ msg: "Success", data: result });
	} catch (err) {
		console.error('Error creating user:', err);
		return res.status(400).json({ msg: "Error", error: err.message });
	}
};
const handleUserLogin = async(req,res)=>{
	try{
		const body = req.body;
		const result = await User.findOne({
			username:body.username,
			password:body.password
		});
		if(!result){
			return res.status(401).json({msg:"Invalid username or password"});
		}
		const sessionId = uuidv4();
		setUser(sessionId,result);
		res.cookie('uid',sessionId);
		console.log(result);
		return res.status(200).json({msg:"Login successful",data:result});
	}
	catch(err){
		return res.status(400).json({msg:"Error",error:err.message});
	}
}
const handleUserLogout = async(req,res)=>{
	try{
		const id = req.cookies.uid;
		if (!id) {
      		return res.status(400).json({ msg: 'No user cookie found!' });
    	}
		res.clearCookie('uid'); //The clearCookie() method takes cookie name, not the cookie value.
		return res.json({msg:'Logged out Successfully!'})
	}
	catch(err){
		return res.json({msg:err.message})
	}
}
const handleUser = async(req,res)=>{
	try{
		const id = req.cookies.uid;
		const user = getUser(id);
		return res.json({msg:"User fetched successfully!",user:user})
	}
	catch(err){
		return res.json({msg:err.message})
	}
}
module.exports = {
	handleUserSignUp, handleUserLogin,handleUserLogout,handleUser,
}
