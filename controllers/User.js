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
