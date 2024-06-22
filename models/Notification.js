// const NotificationSchema = new mongoose.Schema({
//   userId: String, // ID of the user receiving the notification
//   type: String, // 'message' or 'friend_request'
//   content: String, // Brief description or message for the notification
//   conversationId: { type: String, default: null }, // Optional, for message notifications
//   friendRequestId: { type: String, default: null }, // Optional, for friend request notifications
//   timestamp: { type: Date, default: Date.now },
//   read: { type: Boolean, default: false }
// });

import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
  friendRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FriendRequest",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);

export default Notification;
