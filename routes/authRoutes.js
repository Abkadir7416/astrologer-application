const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const Astrologer = require("../models/Astrologers");

const router = express.Router();

// 🔹 User Signup
router.post("/signup/user", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();
    res.status(201).json({ message: newUser.name + " registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Astrologer Signup
router.post("/signup/astrologer", async (req, res) => {
  try {
    const { name, email, password, priorityFactor } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAstrologer = new Astrologer({
      name,
      email,
      password: hashedPassword,
      role: "astrologer",
      priorityFactor,
    });

    await newAstrologer.save();
    res.status(201).json({ message: newAstrologer.name + " registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 User Login
router.post("/login/user", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare plain password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Astrologer Login
router.post("/login/astrologer", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find astrologer in the database
    const astrologer = await Astrologer.findOne({ email });

    if (!astrologer) {
      return res.status(400).json({ error: "Astrologer not found" });
    }

    // Compare plain password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, astrologer.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate Token
    const token = jwt.sign(
      { id: astrologer._id, role: astrologer.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, role: astrologer.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
