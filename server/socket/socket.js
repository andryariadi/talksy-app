import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const userSockets = {};

console.log(userSockets, "<---userSockets di socket.js");

io.on("connection", (socket) => {
  console.log("new user connected", socket.id, socket);

  const userId = socket.handshake.query.userId;
  console.log(userId, "<---userId di socket.js");

  if (userId !== undefined) userSockets[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSockets));

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSockets[userId];
    io.emit("getOnlineUsers", Object.keys(userSockets));
  });
});

export { app, io, server };
