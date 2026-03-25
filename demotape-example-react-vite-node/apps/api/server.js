const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory data store
let nextId = 4;
let items = [
  {
    id: 1,
    title: "Design homepage",
    description: "Create wireframes and mockups for the landing page",
    status: "done",
  },
  {
    id: 2,
    title: "Build API endpoints",
    description: "Implement REST API for item management",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Write tests",
    description: "Add unit and integration tests for core features",
    status: "todo",
  },
];

// GET /api/items — return all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// POST /api/items — create a new item
app.post("/api/items", (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const item = {
    id: nextId++,
    title,
    description: description || "",
    status: "todo",
  };
  items.push(item);
  res.status(201).json(item);
});

// PUT /api/items/:id — update an item
app.put("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  const { title, description, status } = req.body;
  if (title !== undefined) items[index].title = title;
  if (description !== undefined) items[index].description = description;
  if (status !== undefined) items[index].status = status;
  res.json(items[index]);
});

// DELETE /api/items/:id — delete an item
app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  items.splice(index, 1);
  res.status(204).end();
});

// GET /api/health — health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
