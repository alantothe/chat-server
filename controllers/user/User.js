import User from "../../models/User.js";

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
