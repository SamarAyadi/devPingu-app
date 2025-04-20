import express from "express";
import { validateSignUpData } from "../utils/validation.js";
import bcrypt from 'bcrypt';

import User from "../models/user.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    //^ Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //^ Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //^   Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();

    res.json({ message: "User Added successfully!" });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});
