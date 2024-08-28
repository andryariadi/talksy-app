import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

server.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});
