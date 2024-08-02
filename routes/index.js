import { Router } from "express";
import messageRouter from "./Messages.js";
import notificationRouter from "./Notification.js";
import friendRequestRouter from "./FriendRequest.js";
import conversationRouter from "./Conversation.js";
import usersRouter from "./User.js";
import emailsRouter from "./Emails.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the api root!");
});

router.use("/user", usersRouter);
router.use("/email", emailsRouter);
router.use("/friendrequest", friendRequestRouter);
router.use("/message", messageRouter);
router.use("/notification", notificationRouter);
router.use("/conversation", conversationRouter);

export default router;
