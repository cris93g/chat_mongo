require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const { connection, connect } = require("mongoose");
const { getUser, strat, logout } = require(`${__dirname}/controllers/authCtrl`);
const passport = require("passport");
const socketio = require("socket.io");
const session = require("express-session");
const http = require("http");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);





const port = process.env.PORT || 3001;
const routes = require("./routes/routes");
const { User } = require("./models/userSchema");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(cors());
app.use(json());
app.use(passport.initialize());
app.use(passport.session());
passport.use(strat);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

const uri = process.env.URI;

connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

passport.serializeUser((profile, done) => {
  User.findOne({
    id: profile.id,
    username: profile.displayName,
    picture: profile.picture
  })
    .then(response => {
      if (!response) {
        const newUser = new User({
          id: profile.id,
          username: profile.displayName,
          picture: profile.picture,
          newUser: true
        });
        newUser
          .save()
          .then(res => {
            done(null, res);
          })
          .catch(err => console.log(err));
      } else {
        User.findOneAndUpdate({ id: response.id }, { new: true }).then(user => {
          done(null, profile);
        });
      }
    })
    .catch(err => console.log(err));
});

passport.deserializeUser((profile, done) => {
  done(null, profile);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/home",
    failureRedirect: "http://localhost:3000/#/"
  })
);

app.get("/me", getUser);
app.get("/logout", logout);



io.on('connection', function (socket) {
  socket.broadcast.emit('user connected');
});



routes(app);

connection.once("open", () => {
  console.log(`we in boyyyyys`);
});

server.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
