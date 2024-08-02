import Conversation from "../../models/Conversation.js";

export const getAll = async (req, res) => {
  const { _id } = req.params;
  try {
    const conversations = await Conversation.find({
      members: _id,
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
