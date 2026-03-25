import { getItems, addItem } from '$lib/items.js';

export function load() {
	return {
		items: getItems()
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const name = data.get('name')?.toString().trim();

		if (!name) {
			return { success: false, error: 'Item name is required' };
		}

		addItem(name);
		return { success: true };
	}
};
