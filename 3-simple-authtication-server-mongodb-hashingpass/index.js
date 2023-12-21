const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const md5 = require("md5");
const cors = require("cors");
const app = express();
const User = require("./models/user.model");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`Database connection is successful`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      email: req.body.email,
      password: md5(req.body.password),
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = md5(req.body.password);
    const user = await User.findOne({ email: email });

    if (user && user.password === password) {
      res.status(200).json({ status: "Valid user" });
    } else {
      res.status(404).json({ status: "Not valid user" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server is running");
});
