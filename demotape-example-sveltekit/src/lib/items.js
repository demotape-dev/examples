/** @type {string[]} */
let items = ['Example item 1', 'Example item 2'];

export function getItems() {
	return items;
}

export function addItem(name) {
	items.push(name);
	return items;
}
