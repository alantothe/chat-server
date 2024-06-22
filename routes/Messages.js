import { Router } from "express";

const getAll = (req, res) => {
  res.send("Get all");
};

const router = Router();
router.get("/api/messages/search", getAll);

export default router;
