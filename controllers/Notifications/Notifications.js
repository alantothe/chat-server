import Notification from "../../models/Notification.js";
import Conversation from "../../models/Conversation.js";

export const getNotifications = async (req, res) => {
  const { _id } = req.params;
  try {
    const notifications = await Notification.find({
      recipientId: _id,
    }).exec();
    res.status(200).json(notifications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
