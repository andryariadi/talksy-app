import User from "../models/user.model.js";

class Controller {
  static async getUsers(req, res) {
    const currentUserId = req.user._id;
    try {
      const users = await User.find({ _id: { $ne: currentUserId } }).select("-password");

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }
}

export default Controller;
