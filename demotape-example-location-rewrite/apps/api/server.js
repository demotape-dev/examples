const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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

// Login — validates credentials, sets auth cookie, returns redirect URL
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "demo" && password === "demo") {
    res.cookie("auth", "authenticated", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour
    });
    return res.json({ redirect: "/dashboard" });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

// Auth check — returns whether the user is authenticated
app.get("/api/auth/check", (req, res) => {
  const authenticated = req.cookies.auth === "authenticated";
  res.json({ authenticated });
});

// Logout — clears cookie, returns redirect URL
app.post("/api/logout", (req, res) => {
  res.clearCookie("auth");
  res.json({ redirect: "/login" });
});

// Server redirect test — actual 302 redirect with Location header
app.get("/api/redirect-test", (req, res) => {
  res.redirect(302, "/dashboard/settings");
});

// Dashboard data — protected endpoint
app.get("/api/dashboard/data", (req, res) => {
  if (req.cookies.auth !== "authenticated") {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json({
    message: "Dashboard data loaded",
    stats: {
      visitors: 1234,
      sessions: 567,
      avgDuration: "4m 32s",
    },
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
