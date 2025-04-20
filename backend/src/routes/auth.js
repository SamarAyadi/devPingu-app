import express from "express";
import { validateSignUpData } from "../utils/validation.js";
import bcrypt from 'bcrypt';


import userModel from "../models/user.js";
import { validatePassword } from './../models/user.js';

const authRouter = express.Router();


// === SIGN UP ===
authRouter.post("/signup", async (req, res) => {
  try {
    //^  // Validate input data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //^ Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //^ Create and save the user
    const user = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json({ message: "User added successfully!" });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// === LOGIN ===
authRouter.post("/login", async(req, res) => {
  try {
    const { emailId, password } = req.body;
    
    // Check if user exists
    const user = await userModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await userModel.validatePassword(password);

  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }

  })
