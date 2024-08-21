import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    // console.log(token, "<----dimiddleware1");

    if (!token) return res.status(401).json({ error: "Unauthorized - No token provided!" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(verified, "<----dimiddleware2");

    if (!verified) return res.status(401).json({ error: "Unauthorized - Invalid token!" });

    const user = await User.findById(verified.userId);
    // console.log(user, "<----dimiddleware3");

    if (!user) return res.status(401).json({ error: "Unauthorized - User not found!" });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export default protectRoute;
