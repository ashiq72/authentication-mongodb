const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
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
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.listen(5000, () => {
  console.log("Server is running");
});
