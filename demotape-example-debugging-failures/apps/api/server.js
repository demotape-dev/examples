const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// In-memory submissions store (no dedup — intentional)
let submissions = [];
let nextId = 1;

// POST /api/submit — intentionally flaky
app.post("/api/submit", (req, res) => {
  const roll = Math.random();

  // 30% chance: 500 error
  if (roll < 0.3) {
    console.log("[api] Returning 500 (simulated flaky failure)");
    return res.status(500).json({
      error: "Database connection lost",
      details: "Connection to primary replica timed out after 5000ms. Retries exhausted.",
      code: "ECONNRESET",
    });
  }

  // 20% chance: 3-second delay then success
  if (roll < 0.5) {
    console.log("[api] Simulating slow response (3s delay)");
    return setTimeout(() => {
      const entry = {
        id: nextId++,
        ...req.body,
        timestamp: new Date().toISOString(),
      };
      submissions.push(entry);
      res.json(entry);
    }, 3000);
  }

  // 50% chance: immediate success
  console.log("[api] Immediate success");
  const entry = {
    id: nextId++,
    ...req.body,
    timestamp: new Date().toISOString(),
  };
  submissions.push(entry);
  res.json(entry);
});

// GET /api/submissions — returns all submissions (including duplicates)
app.get("/api/submissions", (req, res) => {
  res.json(submissions);
});

// GET /api/form-config — randomly omits the "phone" field
app.get("/api/form-config", (req, res) => {
  const fields = [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "message", label: "Message", type: "textarea", required: true },
  ];

  // 40% chance: include phone field; 60% chance: omit it (simulates missing field bug)
  if (Math.random() < 0.4) {
    fields.splice(2, 0, {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      required: false,
    });
  }

  res.json({ fields });
});

// DELETE /api/submissions — clear all
app.delete("/api/submissions", (req, res) => {
  submissions = [];
  nextId = 1;
  res.json({ cleared: true });
});

app.listen(PORT, () => {
  console.log(`[api] Debugging failures API running on http://localhost:${PORT}`);
});
