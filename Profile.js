const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  profileMobile: { type: String, required: true },
  name: { type: String, required: true },
  transactions: [
    {
      type: { type: String, enum: ["borrow", "return"], required: true },
      amount: { type: Number, required: true },
      date: { type: Date, default: Date.now },
      remarks: { type: String },
    },
  ],
});

module.exports = mongoose.model("Profile", ProfileSchema);
