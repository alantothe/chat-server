import Messages from "../../models/Messages.js";
import Conversation from "../../models/Conversation.js";
import User from "../../models/User.js";

export const createMessage = async (req, res) => {
  const { recipientIds, senderId, message, img } = req.body;

  const members = [senderId, ...recipientIds];

  try {
    // check if there's an existing conversation between the members
    let conversation = await Conversation.findOne({
      members: { $all: members },
    });

    // if no conversation exists, create one
    if (!conversation) {
      conversation = new Conversation({
        members: members,
        lastMessage: message,
        lastMessageFrom: senderId,
        unreadCount: new Map(
          members.map((member) => [
            member,
            member.toString() === senderId.toString() ? 0 : 1,
          ])
        ),
      });

      await conversation.save();
    } else {
      // update the last message for the existing conversation
      conversation.set({
        lastMessage: message,
        lastSeenBy: senderId,
        lastMessageFrom: senderId,
      });
      await conversation.save();
    }
    // create the new message and link it to the conversation
    const newMessage = new Messages({
      conversationId: conversation._id,
      senderId,
      message,
      img,
    });

    const messageSaved = await newMessage.save();

    // push conversation id to user's activeConversations
    await conversation.members.forEach(async (member) => {
      await User.findByIdAndUpdate(
        member._id,
        { $push: { activeConversations: conversation._id } },
        { new: true }
      ).exec();
    });

    res.status(201).json({
      message: "Message was sent successfully!",
      messageData: messageSaved,
      members: conversation.detailedMembers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
