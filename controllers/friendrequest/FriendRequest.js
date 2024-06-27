import FriendRequest from "../../models/FriendRequest.js";

export const sendFriendRequest = async (req, res) => {
  const { requisitionerId, recipientId } = req.body;
  try {
    const request = await FriendRequest.create({
      requisitionerId,
      recipientId,
      status: "pending",
    });
    res.status(201).json({ message: "Friend request sent", request });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
