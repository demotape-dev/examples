const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.post("/api/session/start", (req, res) => {
  const sessionId = crypto.randomBytes(16).toString("hex");
  res.cookie("session_id", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60, // 1 hour
  });
  res.json({ status: "session_started" });
});

app.get("/api/me", (req, res) => {
  res.json({
    cookie: req.cookies.session_id || null,
    authHeader: req.headers.authorization || null,
    timestamp: new Date().toISOString(),
  });
});

app.delete("/api/session", (req, res) => {
  res.clearCookie("session_id");
  res.json({ status: "session_ended" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
