import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    lastMessage: {
      type: String,
    },
    lastMessageFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    unreadCount: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;
