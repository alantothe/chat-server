import { Router } from "express";
import * as auth from "../controllers/user/Auth.js";
import * as controllers from "../controllers/user/User.js";

const router = Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/limited/:_id", controllers.limitedUser);
router.get("/entire/:_id", controllers.entireUser);

export default router;
