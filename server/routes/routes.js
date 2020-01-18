const { addUser, findUser } = require('../controllers/userCtrl');

module.exports = (app) => {
	app.post('/api/adduser', addUser);
	app.get('/api/user', findUser);
};
