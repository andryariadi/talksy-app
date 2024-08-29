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

export const getReceiverSocketId = (receiverId) => {
  return userSockets[receiverId];
};

const userSockets = {};

io.on("connection", (socket) => {
  console.log("new user connected", socket.id);

  const userId = socket.handshake.query.userId;
  console.log(userId, "<---userId di socket.js");

  if (userId !== undefined) userSockets[userId] = socket.id;
  console.log(userSockets, "<---userSockets di socket.js");

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSockets));
  console.log(Object.keys(userSockets), "<---userSockets di socket.js");

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSockets[userId];
    io.emit("getOnlineUsers", Object.keys(userSockets));
  });
});

export { app, io, server };
