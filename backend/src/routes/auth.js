import express from "express";
import { validateSignUpData } from "../utils/validation.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const authRouter = express.Router();


// Utility function to set JWT token in cookie
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true, // Prevent access from JavaScript
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    sameSite: "Strict", // Prevent CSRF
    expires: new Date(Date.now() + 8 * 3600000), // 8 hours
  });
};

// === SIGN UP ===
authRouter.post("/signup", async (req, res) => {
  try {
    //^  // Validate input data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    //^ Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //^ Create and save the user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    // Set token as secure cookie
     setTokenCookie(res, token);

    const { _id, emailId: email } = savedUser;
    res.status(201).json({
      message: "User registered successfully!",
      user: { _id, email, firstName, lastName },
    });
  } catch (err) {
    res.status(400).json({ error: "Error: " + err.message });
  }
});

// === LOGIN ===
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Find user by email
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Validate password
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = await user.getJWT();

    // Set the token in a secure cookie
    setTokenCookie(res, token);

    // Send back limited user info (no password!)
    const { _id, emailId: email, name } = user;
    res.status(200).json({
      message: "Login successful",
      user: { _id, email, name },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

export default authRouter;
