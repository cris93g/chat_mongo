const { User } = require('../models/userSchema');

let addUser = async (id, username, picture, req, res) => {
	const newUser = new User({ id, username, picture });
	newUser.save();
	return newUser;
};

let findUser = async (req, res) => {
	let data = await User.findOne({ id: req });
	if (data) {
		return JSON.stringify(data);
	}
};

module.exports = {
	addUser,
	findUser
};
