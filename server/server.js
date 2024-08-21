import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use("/api/auth", authRoute);

app.listen(port, () => {
  connectToMongoDB();
  console.log(`Server running on port ${port}`);
});
