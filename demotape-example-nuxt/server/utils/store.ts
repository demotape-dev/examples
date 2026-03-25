export interface Item {
  id: number
  name: string
  createdAt: string
}

let nextId = 4

export const items: Item[] = [
  { id: 1, name: 'Example item one', createdAt: new Date().toISOString() },
  { id: 2, name: 'Example item two', createdAt: new Date().toISOString() },
  { id: 3, name: 'Example item three', createdAt: new Date().toISOString() }
]

export function addItem(name: string): Item {
  const item: Item = {
    id: nextId++,
    name,
    createdAt: new Date().toISOString()
  }
  items.push(item)
  return item
}
