const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 3000;
const JWT_SECRET = "demotape-example-secret";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Auth middleware
function authenticate(req, res, next) {
  const token = req.cookies.token || extractBearer(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

function extractBearer(header) {
  if (!header) return null;
  const parts = header.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") return parts[1];
  return null;
}

// Login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username !== "demo" || password !== "demo") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = { name: "Demo User", email: "demo@example.com" };
  const token = jwt.sign({ sub: "demo-user-1", ...user }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60, // 1 hour
  });

  res.json({ token, user });
});

// Profile (protected)
app.get("/api/profile", authenticate, (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    sub: req.user.sub,
    message: "This is a protected profile endpoint.",
  });
});

// Settings (protected)
app.get("/api/settings", authenticate, (req, res) => {
  res.json({
    theme: "light",
    notifications: true,
    language: "en",
  });
});

// Logout
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ status: "logged_out" });
});

// Health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
