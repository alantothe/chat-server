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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ConversationSchema.virtual("detailedLastMessageFrom", {
  ref: "User",
  localField: "lastMessageFrom",
  foreignField: "_id",
  justOne: true,
});

const Conversation = mongoose.model("Conversation", ConversationSchema);

export default Conversation;
