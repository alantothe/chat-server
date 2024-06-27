import mongoose from "mongoose";
const FriendRequestSchema = mongoose.Schema(
  {
    requisitionerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String, //'pending', 'accepted', 'rejected'
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a unique combination of requisitionerId and recipientId
FriendRequestSchema.index(
  { requisitionerId: 1, recipientId: 1 },
  { unique: true }
);

const FriendRequest = mongoose.model("FriendRequest", FriendRequestSchema);

export default FriendRequest;
