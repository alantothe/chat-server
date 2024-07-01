import Notification from "../../models/Notification.js";

export const getNotifications = async (req, res) => {
  const { _id } = req.params;
  try {
    // Find notifications
    const notifications = await Notification.find({
      recipientId: _id,
    }).exec();

    //check if user is logged in

    // Update notifications to mark them as read
    const updateNotifications = notifications.map((notification) => {
      return Notification.findByIdAndUpdate(
        notification._id,
        { read: true },
        { new: true }
      ).exec();
    });

    // Wait for all updates to complete
    const updatedNotifications = await Promise.all(updateNotifications);

    res.status(200).json(updatedNotifications);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
