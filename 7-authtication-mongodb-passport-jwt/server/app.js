const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const passport = require("passport");

require("./config/database");

const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

require("./config/passport");

//Base url
app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

//Register Route
app.post("/register", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("User already exists");

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        username: req.body.username,
        password: hash,
      });
      await newUser
        .save()
        .then((user) => {
          res.send({
            success: true,
            message: "User is created Successfully",
            user: {
              id: user._id,
              username: user.username,
            },
          });
        })
        .catch((error) => {
          res.send({
            success: false,
            message: "User is not created",
            error: error,
          });
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Login Route
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "user not found",
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        message: "Password Incorrect",
      });
    }

    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    return res.status(200).send({
      success: true,
      message: "User is logged in successfully",
      token: "Bearer " + token,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Error handling
app.use("*", (req, res, next) => {
  res.status(404).json({
    Message: "route not found",
  });
});

//Server Error handling
app.use("*", (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Server Something broke!");
});

module.exports = app;
