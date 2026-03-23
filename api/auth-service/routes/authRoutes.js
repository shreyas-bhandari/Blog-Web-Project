const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json("Invalid credentials");

    const token = jwt.sign({ id: user._id, email: user.email }, "secret");
    res.json({ token });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, 'email _id password');
    res.json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;