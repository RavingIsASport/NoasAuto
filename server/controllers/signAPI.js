import { Router } from "express";
import Admin from "../models/adminModel.js";
import generateToken from "../utils/auth.js";

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const foundUser = await Admin.findOne({ username });

    // Check if the user exists before calling isCorrectPassword()
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the password
    const isCorrectPassword = await foundUser.isCorrectPassword(password);

    if (!isCorrectPassword) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate a token
    const token = generateToken(foundUser);

    res.json({ token, username: foundUser.username });
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
