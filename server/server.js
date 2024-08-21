import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});
