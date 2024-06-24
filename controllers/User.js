import User from "../models/User";

export const entireUser = (req, res) => {
  const { _id } = req.params;
  try {
    const user = User.findById(_id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

export const limitedUser = (req, res) => {
  const { _id } = req.params;
  try {
    const user = User.findById(_id)
      .select("username email avatar bio backgroundImage")
      .exec();
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};
