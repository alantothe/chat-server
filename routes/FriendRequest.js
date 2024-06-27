import { Router } from "express";
import * as controllers from "../controllers/friendrequest/FriendRequest.js";

const router = Router();
router.post("/request", controllers.sendFriendRequest);
router.patch("/accept/:_id", controllers.acceptFriendRequest);
router.patch("/reject/:_id", controllers.rejectFriendRequest);

export default router;
