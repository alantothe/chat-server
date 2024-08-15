import Messages from "../../models/Messages.js";
import Conversation from "../../models/Conversation.js";
import User from "../../models/User.js";
import mongoose from "mongoose";

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

      // push conversation id to user's activeConversations or activeGroupConversations
      if (members.length <= 2) {
        await Promise.all(
          members.map(async (member) => {
            await User.findByIdAndUpdate(
              member,
              { $push: { activeConversations: conversation._id } },
              { new: true }
            );
          })
        );
      } else {
        await Promise.all(
          members.map(async (member) => {
            await User.findByIdAndUpdate(
              member,
              { $push: { activeGroupConversations: conversation._id } },
              { new: true }
            );
          })
        );
      }
    } else {
      // update the last message for the existing conversation
      conversation.set({
        lastMessage: message,
        lastSeenBy: senderId,
        lastMessageFrom: senderId,
        unreadCount: new Map(
          members.map((member) => [
            member,
            member.toString() === senderId.toString()
              ? 0
              : (conversation.unreadCount.get(member) || 0) + 1,
          ])
        ),
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

    await newMessage.save();

    // // send a notification for each recipient
    // await Promise.all(
    //   recipientIds.map(async (recipientId) => {
    //     const notification = new Notification({
    //       recipientId,
    //       type: "message",
    //       content: message,
    //       conversationId: conversation._id,
    //     });
    //     await notification.save();
    //   })
    // );

    res.status(201).json({
      message: "Message was sent successfully!",
      members: conversation.detailedMembers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  const { _id, userId } = req.params;

  try {
    const conversationId = new mongoose.Types.ObjectId(_id);
    const conversation = await Conversation.findById(conversationId)
        .populate({
            path: 'members',
            select: 'firstName lastName avatar' 
        })
        .exec();
    for (let i=0; i<conversation.members.length;i++){
      if (conversation.members[i]._id.toString() === userId.toString()){
        conversation.members.splice(i, 1);
      }
    }
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }


    const messages = await Messages.find({ 
      conversationId: conversationId
      

     })

    
    if (!messages || messages.length === 0) {
      return res.status(404).json({ error: "Messages not found" });
    }
    

    res.json({
      members: conversation.members,
      messages: messages
    });


  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};