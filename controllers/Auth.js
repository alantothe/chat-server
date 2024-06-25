import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

let TOKEN_KEY = process.env.TOKEN_KEY;

// for JWT expiration
const today = new Date();
const exp = new Date(today);
exp.setDate(today.getDate() + 30);

export const register = async (req, res) => {
  const { firstName, lastName, email, password, avatar } = req.body;
  let user;
  try {
    // check if user already exists
    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    user = await User.create({
      firstName,
      lastName,
      avatar,
      email,
      password: hashedPassword,
      status: "offline",
      bio: "",
      backgroundImage: "",
      friends: [],
      activeConversations: [],
      activeGroupConversations: [],
      openConversation: null,
    });

    const savedUser = await user.save();

    const payload = {
      _id: savedUser._id,
      avatar: savedUser.avatar,
      exp: parseInt(exp.getTime() / 1000),
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
