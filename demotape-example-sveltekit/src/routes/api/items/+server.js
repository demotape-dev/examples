import { json } from '@sveltejs/kit';
import { getItems, addItem } from '$lib/items.js';

export function GET() {
	return json({ items: getItems() });
}

export async function POST({ request }) {
	const body = await request.json();
	const name = body.name?.toString().trim();

	if (!name) {
		return json({ error: 'Item name is required' }, { status: 400 });
	}

	const items = addItem(name);
	return json({ items }, { status: 201 });
}
