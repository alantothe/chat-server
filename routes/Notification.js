import { Router } from "express";
import * as notificationController from "../controllers/Notifications/Notifications.js";

const router = Router();

router.get("/getNotifications/:_id", notificationController.getNotifications);

export default router;
