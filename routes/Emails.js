import { Router } from "express";
import * as controllers from "../controllers/emails/Emails.js";

const router = Router();

router.post("/send", controllers.sendEmail);

export default router;
