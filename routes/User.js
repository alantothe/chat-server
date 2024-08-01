import { Router } from "express";
import * as auth from "../controllers/user/Auth.js";
import * as controllers from "../controllers/user/User.js";

const router = Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.patch("/reset", auth.resetPassword);
router.post("/limited", controllers.limitedUser);
router.patch("/open-chat", controllers.openConversation);
router.patch("/close-chat", controllers.closeConversation);
router.patch("/update/:_id", controllers.updateUser);
router.get("/entire/:_id", controllers.entireUser);

export default router;
