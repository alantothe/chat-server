import { Resend } from "resend";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const TOKEN_KEY = process.env.TOKEN_KEY;

export const sendEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const payload = {
    _id: user._id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
  };

  const token = jwt.sign(payload, TOKEN_KEY);

  const resetLink = `http://localhost:3000/?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Acme <admin@alanwebdev.com>",
    to: [email],
    subject: `Password Reset for ${user.firstName && user.lastName}  ${
      user.email
    }`,
    html: `<strong>Click <a href="${resetLink}">here</a> to reset your password.</strong>`,
  });

  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ message: "Reset link sent to your email address" });
};
