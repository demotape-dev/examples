import { headers } from "next/headers";
import AddItemForm from "./add-item-form";

async function getItems() {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/items`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }

  return res.json();
}

export default async function HomePage() {
  const items = await getItems();

  return (
    <main>
      <h1>Next.js SSR Example</h1>
      <span className="badge">Server-rendered</span>
      <p>
        This page is server-rendered. The item list below was fetched during SSR
        via an API route, proving that both SSR and API routes work through the
        proxy.
      </p>

      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>

      <h2>Add an item</h2>
      <AddItemForm />
    </main>
  );
}
