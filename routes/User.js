import { Router } from "express";
import * as auth from "../controllers/Auth.js";
import * as controllers from "../controllers/User.js";

const router = Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/limited/:_id", controllers.limitedUser);
router.get("/entire/:_id", controllers.entireUser);

export default router;
