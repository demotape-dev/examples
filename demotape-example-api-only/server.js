const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: "Widget A", description: "A standard widget", price: 9.99 },
  { id: 2, name: "Gadget B", description: "A fancy gadget", price: 24.99 },
  { id: 3, name: "Doohickey C", description: "An essential doohickey", price: 14.5 },
];
let nextId = 4;

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root redirects to docs
app.get("/", (_req, res) => {
  res.redirect("/docs");
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// List all items
app.get("/api/items", (_req, res) => {
  res.json(items);
});

// Get single item
app.get("/api/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

// Create item
app.post("/api/items", (req, res) => {
  const { name, description, price } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const item = {
    id: nextId++,
    name,
    description: description || "",
    price: price || 0,
  };
  items.push(item);
  res.status(201).json(item);
});

// Update item
app.put("/api/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  const { name, description, price } = req.body;
  items[index] = {
    ...items[index],
    ...(name !== undefined && { name }),
    ...(description !== undefined && { description }),
    ...(price !== undefined && { price }),
  };
  res.json(items[index]);
});

// Delete item
app.delete("/api/items/:id", (req, res) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }
  items.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
  console.log(`Swagger UI at http://localhost:${PORT}/docs`);
});
