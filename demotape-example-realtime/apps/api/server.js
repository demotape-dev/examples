const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const PORT = 3000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Track connected users
const users = new Map();

io.on("connection", (socket) => {
  // Assign a random username
  const username = `User-${Math.floor(1000 + Math.random() * 9000)}`;
  users.set(socket.id, username);

  console.log(`${username} connected (${users.size} online)`);

  // Tell the connecting client their username
  socket.emit("welcome", { username });

  // Broadcast updated user count to everyone
  io.emit("user-count", { count: users.size });

  // Notify others that someone joined
  socket.broadcast.emit("message", {
    sender: "system",
    text: `${username} joined the chat`,
    timestamp: new Date().toISOString(),
  });

  // Handle chat messages
  socket.on("message", (data) => {
    const msg = {
      sender: username,
      text: data.text,
      timestamp: new Date().toISOString(),
    };
    io.emit("message", msg);
  });

  // Handle typing indicator
  socket.on("typing", () => {
    socket.broadcast.emit("typing", { username });
  });

  socket.on("stop-typing", () => {
    socket.broadcast.emit("stop-typing", { username });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    users.delete(socket.id);
    console.log(`${username} disconnected (${users.size} online)`);

    io.emit("user-count", { count: users.size });
    io.emit("message", {
      sender: "system",
      text: `${username} left the chat`,
      timestamp: new Date().toISOString(),
    });
  });
});

// Broadcast a system message every 30 seconds
setInterval(() => {
  if (users.size > 0) {
    io.emit("message", {
      sender: "system",
      text: `System check — ${users.size} user${users.size === 1 ? "" : "s"} online at ${new Date().toLocaleTimeString()}`,
      timestamp: new Date().toISOString(),
    });
  }
}, 30000);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", onlineUsers: users.size });
});

server.listen(PORT, () => {
  console.log(`API + WebSocket server running on http://localhost:${PORT}`);
});
