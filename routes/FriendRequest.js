import { Router } from "express";
import * as controllers from "../controllers/friendrequest/FriendRequest.js";

const router = Router();
router.post("/request", controllers.sendFriendRequest);

export default router;
