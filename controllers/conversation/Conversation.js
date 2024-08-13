import Conversation from "../../models/Conversation.js";

export const getAll = async (req, res) => {
  const { _id } = req.params;
  try {
    const conversations = await Conversation.find({
      members: _id,
      $expr: { $eq: [{ $size: "$members" }, 2] }, // only has 2 members
    }).populate({
      path: "detailedLastMessageFrom",
      model: "User",
      select: "firstName lastName avatar",
    });
    console.log("Conversations:", conversations);

    if (!conversations || conversations.length === 0) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllGroup = async (req, res) => {
  const { _id } = req.params;
  try {
    const conversations = await Conversation.find({
      members: _id,
      $expr: { $gte: [{ $size: "$members" }, 3] }, // 3+ members
    }).populate({
      path: "detailedLastMessageFrom",
      model: "User",
      select: "firstName lastName avatar",
    });
    console.log("Conversations:", conversations);

    if (!conversations || conversations.length === 0) {
      return res.status(404).json({ error: "Conversation not found" });
    }
    res.json(conversations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// export const openConversation = async (req, res) => {

//   const { _id } = req.params;
//   try {
//     const conversation = await Conversation.findById(_id)
//     res.json(conversation);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Internal server error" });
// }
// if (!conversation) {
//   return res.status(404).json({ error: "Conversation not found" });
// }

// }