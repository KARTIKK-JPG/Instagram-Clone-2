import { Server } from "socket.io";
import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

// ✅ CORS Middleware (important for frontend deployment)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://instagram-clone-pi-neon.vercel.app"
  ],
  credentials: true,
}));

// ✅ Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://instagram-clone-pi-neon.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

const userSocketMap = {}; // userId -> socket.id

export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`✅ User connected: userId=${userId}, socketId=${socket.id}`);
  }

  // 🟢 Send online users to all
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // 🔔 Optional event listeners (notification etc.)
  socket.on("notification", (notification) => {
    const receiverSocketId = getReceiverSocketId(notification?.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("notification", notification);
    }
  });

  // ❌ On disconnect
  socket.on("disconnect", () => {
    if (userId) {
      delete userSocketMap[userId];
      console.log(`❌ User disconnected: userId=${userId}`);
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
