const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firebaseUID: { type: String, required: true, unique: true },
  username: String,
  email: String,
  theme:{
    type:Boolean
  }
});

module.exports = mongoose.model("User", userSchema);
