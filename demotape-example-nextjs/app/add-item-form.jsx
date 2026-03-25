"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddItemForm() {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || submitting) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (res.ok) {
        setName("");
        router.refresh();
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New item name..."
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
