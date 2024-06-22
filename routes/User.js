import { Router } from "express";

const router = Router();

// Placeholder controller functions
const getUsers = (req, res) => {
  res.send("Get all users");
};

// Define your routes and use placeholder functions
router.get("/", getUsers);

export default router;
