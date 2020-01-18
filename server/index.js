require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const { connection, connect } = require("mongoose");
const { addUser, findUser } = require("./controllers/userCtrl");
const { getUser, strat, logout } = require(`${__dirname}/controllers/authCtrl`);
const passport = require("passport");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 3001;
const routes = require("./routes/routes");

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

const uri = process.env.URI;

connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

passport.serializeUser((profile, done) => {
  findUser(profile.id).then(user => {
    if (!user[0]) {
      addUser(profile.id, profile.displayName, profile.picture)
        .then(response => {
          return done(null, response[0]);
        })
        .catch(err => console.log(err));
    } else {
      return done(null, user[0]);
    }
  });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "http://localhost:3000/#/"
  })
);

app.get("/me", getUser);
app.get("/logout", logout);

routes(app);
connection.once("open", () => {
  console.log(`we in boyyyyys`);
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
