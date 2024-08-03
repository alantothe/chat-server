import { Router } from "express";
import * as controllers from "../controllers/conversation/Conversation.js";
const router = Router();

router.get("/all/:_id", controllers.getAll);
router.get("/all/group/:_id", controllers.getAllGroup);

export default router;
