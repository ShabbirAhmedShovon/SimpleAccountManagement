const express = require("express");
const Profile = require("../models/Profile");

const router = express.Router();

// Create a new profile
router.post("/create", async (req, res) => {
  const { userId, profileMobile, name } = req.body;
  
  try {
    const profile = new Profile({ userId, profileMobile, name, transactions: [] });
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a transaction
router.post("/transaction", async (req, res) => {
  const { profileMobile, type, amount, remarks } = req.body;

  try {
    const profile = await Profile.findOne({ profileMobile });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    profile.transactions.push({ type, amount, remarks });
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search for profiles
router.get("/search/:keyword", async (req, res) => {
  const { keyword } = req.params;
  try {
    const profiles = await Profile.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { profileMobile: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
