const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { mobile, username } = req.body;
  const userId = `U${Date.now()}`; // Generate unique ID

  try {
    const user = new User({ mobile, username, userId });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by mobile or userId
router.get("/:identifier", async (req, res) => {
  const { identifier } = req.params;
  try {
    const user = await User.findOne({
      $or: [{ mobile: identifier }, { userId: identifier }],
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
