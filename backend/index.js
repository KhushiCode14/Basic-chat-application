import express from "express";
import dotenv from "dotenv";

dotenv.config();
// 1. import createServer
import { createServer } from "node:http";
// import Server
import { Server } from "socket.io";
const app = express();
const port = process.env.PORT || 4000;
// add app to createServer
const server = createServer(app);
// create server with socket serverA with cors
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send a welcome message to the newly connected user
  socket.emit("room", "Welcome to the server");

  // Handle user joining a room
  socket.on("join_room", ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined room: ${room}`);
  });

  // Handle sending messages to the room
  socket.on("send_message", ({ room, username, message }) => {
    socket.to(room).emit("recieve_message", { username, message });
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log(` disconnected`, socket.id);

    io.emit("message", ` has left the room.`);
  });
});

server.listen(port, () => {
  console.log("server running at http://localhost:3000", port);
});
