import { Router } from "express";
import * as controllers from "../controllers/messages/Messages.js";

const router = Router();
router.get("/get/:_id", controllers.getMessages);
router.post("/send", controllers.createMessage);


export default router;
