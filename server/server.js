import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
