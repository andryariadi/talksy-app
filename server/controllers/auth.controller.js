import generateTokenAndSetCookie from "../libs/genetateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

class Controller {
  static async singup(req, res) {
    const { fullName, username, password, confirmPassword, gender, profilePicture } = req.body;

    try {
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match!" });
      }

      const userExists = await User.findOne({ username });

      if (userExists) {
        return res.status(400).json({ error: "User already exists!" });
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

      const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = new User({
        fullName,
        username,
        password: hashPassword,
        gender,
        profilePicture: profilePicture ? profilePicture : gender === "male" ? boyProfilePic : girlProfilePic,
      });

      if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
      } else {
        return res.status(400).json({ error: "Invalid user data!" });
      }
      res.status(201).json({ newUser, message: "User created successfully!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error!" });
    }
  }

  static async login(req, res) {
    res.send("login bosss");
  }

  static async logout(req, res) {
    res.send("logout");
  }
}

export default Controller;
