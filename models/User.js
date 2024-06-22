import mongoose from "mongoose";
const emailPattern = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
    match: emailPattern,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  status: {
    type: String,
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 300,
  },
  backgroundImage: {
    type: String,
    trim: true,
  },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  activeConversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  ],
  activeGroupConversations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
    },
  ],
  openConversation: {
    type: mongoose.Schema.Types.ObjectId,
    default: "",
    ref: "Conversation",
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
