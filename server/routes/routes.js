const { addUser } = require("../controllers/userCtrl");

module.exports = app => {
  app.post("/api/adduser", addUser);
};
