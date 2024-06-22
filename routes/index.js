import { Router } from "express";
// import Messages from "./Messages";
// import Notification from "./Notification";
// import FriendRequest from "./FriendRequest";
// import Conversation from "./Conversation";

const router = Router();

router.get("/", (req, res) => {
  res.send("This is the api root!");
});

export default router;
