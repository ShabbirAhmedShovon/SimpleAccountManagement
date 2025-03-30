const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("User", UserSchema);
