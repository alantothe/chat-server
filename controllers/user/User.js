import User from "../../models/User.js";
import Conversation from "../../models/Conversation.js";
import Notification from "../../models/Notification.js";
//get
export const entireUser = async (req, res) => {
  const { _id } = req.params;
  try {
    const user = await User.findById(_id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const limitedUser = async (req, res) => {
  const { _id } = req.params;

  try {
    const user = await User.findOne(
      { _id },
      "firstName lastName avatar bio email backgroundImage "
    ).exec();
    console.log("Selected Fields User:", user);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const { _id } = req.params;
  const allowedFields = ["firstName", "lastName", "bio", "backgroundImage"];
  const updateFields = {};

  // filter the request body to include only allowed fields
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updateFields[field] = req.body[field];
    }
  });

  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).exec();
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const openConversation = async (req, res) => {
  const { conversationId, _id } = req.body;

  try {
    // Update the unreadCount map for the given user _id
    const conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      { $set: { [`unreadCount.${_id}`]: 0 } },
      { new: true }
    ).exec();
    // Update the user's openConversation field
    const user = await User.findByIdAndUpdate(
      _id,
      { $set: { openConversation: conversationId } },
      { new: true }
    ).exec();

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.json({
      message: "Conversation opened successfully",
      data: user.openConversation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const closeConversation = async (req, res) => {
  const { _id } = req.body;

  try {
    // Update the user's openConversation field
    const user = await User.findByIdAndUpdate(
      _id,
      { $set: { openConversation: null } },
      { new: true }
    ).exec();

    res.json({
      message: "Conversation closed successfully",
      data: user.openConversation,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
