const { User } = require('../models/user');

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

module.exports = {
	handleUserSignUp
}
