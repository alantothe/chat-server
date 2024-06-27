import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

let TOKEN_KEY = process.env.TOKEN_KEY;
const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { data, error } = await resend.emails.send({
      from: "Acme <admin@alanwebdev.com>",
      to: [email],
      subject: `Welcome to Chattothe!  ${user.firstName} ${user.lastName}`,
      html: `<strong>Thanks for signing up to the greatest chat app of all time</strong>`,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  let user;
  try {
    user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        _id: user._id,
        avatar: user.avatar,

        exp: parseInt(exp.getTime() / 1000),
      };

      const token = jwt.sign(payload, TOKEN_KEY);
      res.status(201).json({ token });
    } else {
      res.status(401).json({
        error: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: "Token and password are required" });
  }

  let payload;
  try {
    payload = jwt.verify(token, TOKEN_KEY);
  } catch (error) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  const user = await User.findById(payload._id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
};
