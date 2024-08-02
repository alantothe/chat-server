import { Router } from "express";
import * as controllers from "../controllers/conversation/Conversation.js";
const router = Router();

router.get("/all/:_id", controllers.getAll);
//

export default router;
