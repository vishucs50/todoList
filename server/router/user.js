const express = require("express");
const User = require("../models/user");
const router = express.Router();
const admin = require("../firebaseAdmin");
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const firebaseUID = decodedToken.uid;
    const newUser = new User({ firebaseUID, username, email });
    await newUser.save();
    res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

router.post("/login", async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const uid = decoded.uid;
    const user = await User.findOne({ firebaseUID: uid });
    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
