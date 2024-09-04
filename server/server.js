import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import authRoute from "./routes/auth.route.js";
import messageRoute from "./routes/message.route.js";
import userRoute from "./routes/user.route.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

// Inisialisasi aplikasi Express
app.use(express.json());
app.use(
  cors({
    origin: "https://talksy-andryariadi.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet()); // Menambahkan middleware helmet untuk keamanan

// Rute API
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
app.use("/api/users", userRoute);

// Menyajikan file statis
app.use(express.static(path.join(__dirname, "/client/dist")));

// Menjalankan server
server.listen(port, () => {
  connectToMongoDB()
    .then(() => {
      console.log(`Server berjalan pada port ${port}`);
    })
    .catch((error) => {
      console.error("Gagal terhubung ke MongoDB:", error);
    });
});
