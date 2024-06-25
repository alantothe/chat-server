import User from "../models/User.js";

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
