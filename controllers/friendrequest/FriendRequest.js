import FriendRequest from "../../models/FriendRequest.js";
import User from "../../models/User.js";
import Notification from "../../models/Notification.js";

export const sendFriendRequest = async (req, res) => {
  const { requisitionerId, recipientId } = req.body;
  try {
    // Check if a friend request already exists
    const existingRequest = await FriendRequest.findOne({
      requisitionerId,
      recipientId,
      status: "pending",
    }).exec();

    // Check if they are already friends
    const areFriends = await User.findOne({
      _id: requisitionerId,
      friends: recipientId,
    }).exec();

    if (existingRequest || areFriends) {
      return res.status(400).json({
        message: "Friend request already exists or you are already friends.",
      });
    }
    const request = await FriendRequest.create({
      requisitionerId,
      recipientId,
      status: "pending",
    });

    // Create a notification
    const notification = new Notification({
      recipientId: recipientId,
      type: "friendRequest",
      content: "You have a new friend request",
      friendRequestId: request._id,
    });

    await notification.save();

    res.status(201).json({ message: "Friend request sent", request });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  const { _id } = req.params;
  try {
    // Update the status
    const request = await FriendRequest.findByIdAndUpdate(
      _id,
      { status: "accepted" },
      { new: true }
    ).exec();

    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    // Grab IDs from request
    const { requisitionerId, recipientId } = request;

    // Push the friend to each user's friends array
    await User.findByIdAndUpdate(requisitionerId, {
      $push: { friends: recipientId },
    }).exec();
    await User.findByIdAndUpdate(recipientId, {
      $push: { friends: requisitionerId },
    }).exec();

    res.json({
      message: "Friend request accepted",
      request,
      requisitionerId,
      recipientId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const rejectFriendRequest = async (req, res) => {
  const { _id } = req.params;
  try {
    const request = await FriendRequest.findByIdAndUpdate(
      _id,
      { status: "rejected" },
      { new: true }
    ).exec();
    if (!request) {
      return res.status(404).json({ message: "Friend request not found" });
    }
    res.json({ message: "Friend request rejected", request });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
