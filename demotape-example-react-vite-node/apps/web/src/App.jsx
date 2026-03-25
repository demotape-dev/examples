import { useState, useEffect } from "react";

const STATUS_ORDER = ["todo", "in-progress", "done"];
const STATUS_LABELS = { todo: "To Do", "in-progress": "In Progress", done: "Done" };

function nextStatus(current) {
  const idx = STATUS_ORDER.indexOf(current);
  return STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
}

export default function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchItems() {
    try {
      const res = await fetch("/api/items");
      if (!res.ok) throw new Error("Failed to fetch items");
      const data = await res.json();
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), description: description.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add item");
      const item = await res.json();
      setItems((prev) => [...prev, item]);
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleStatusToggle(item) {
    const newStatus = nextStatus(item.status);
    try {
      const res = await fetch(`/api/items/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
    } catch (err) {
      setError(err.message);
    }
  }

  function startEditing(item) {
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  }

  async function handleEditSave(id) {
    if (!editTitle.trim()) return;
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle.trim(), description: editDescription.trim() }),
      });
      if (!res.ok) throw new Error("Failed to update item");
      const updated = await res.json();
      setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      cancelEditing();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <div className="container">
        <p className="loading">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Items</h1>
        <p className="subtitle">DemoTape Example &mdash; React + Vite + Node API</p>
      </header>

      {error && (
        <div className="error">
          {error}
          <button onClick={() => setError(null)} className="error-dismiss">
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleAdd} className="add-form">
        <input
          type="text"
          placeholder="Item title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>

      {items.length === 0 ? (
        <p className="empty">No items yet. Add one above.</p>
      ) : (
        <ul className="item-list">
          {items.map((item) => (
            <li key={item.id} className={`item item-${item.status}`}>
              {editingId === item.id ? (
                <div className="item-edit">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="edit-input"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="edit-input"
                  />
                  <div className="edit-actions">
                    <button onClick={() => handleEditSave(item.id)} className="btn-save">
                      Save
                    </button>
                    <button onClick={cancelEditing} className="btn-cancel">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="item-content">
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() => handleStatusToggle(item)}
                      className={`btn-status status-${item.status}`}
                    >
                      {STATUS_LABELS[item.status]}
                    </button>
                    <button onClick={() => startEditing(item)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
