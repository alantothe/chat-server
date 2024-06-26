import { Router } from "express";
// import Messages from "./Messages";
// import Notification from "./Notification";
// import FriendRequest from "./FriendRequest";
// import Conversation from "./Conversation";
import usersRouter from "./User.js";
import emailsRouter from "./Emails.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the api root!");
});

router.use("/user", usersRouter);
router.use("/email", emailsRouter);

export default router;
