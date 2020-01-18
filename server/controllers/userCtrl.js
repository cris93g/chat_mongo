const { User } = require("../models/userSchema");

let findUser = (req, res, id) => {
  console.log(authID);
  Profile.findOne({ _id: authID }).then(profile => {
    // console.log(profile);
    res.status(200).send(profile);
  });
};

let addUser = (req, res) => {
  const { id, username, picture } = req.body;
  const newUser = new User({ username, picture, id });
  newUser
    .save()
    .then(() => res.json("user added"))
    .catch(err => res.status(400).json("error" + err));
};

module.exports = {
  addUser,
  findUser
};
