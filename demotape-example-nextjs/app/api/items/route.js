const items = [
  { id: 1, name: "Example item one" },
  { id: 2, name: "Example item two" },
  { id: 3, name: "Example item three" },
];

let nextId = 4;

export async function GET() {
  return Response.json(items);
}

export async function POST(request) {
  const body = await request.json();
  const name = body.name?.trim();

  if (!name) {
    return Response.json({ error: "Name is required" }, { status: 400 });
  }

  const item = { id: nextId++, name };
  items.push(item);

  return Response.json(item, { status: 201 });
}
