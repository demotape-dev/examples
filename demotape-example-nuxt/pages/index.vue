<script setup lang="ts">
const newItem = ref('')

const { data: items, refresh } = await useFetch('/api/items', {
  default: () => [] as { id: number; name: string; createdAt: string }[]
})

async function addItem() {
  const name = newItem.value.trim()
  if (!name) return

  await $fetch('/api/items', {
    method: 'POST',
    body: { name }
  })

  newItem.value = ''
  await refresh()
}
</script>

<template>
  <div>
    <h2>Items</h2>
    <p class="description">
      This page is server-rendered on first load. Add items using the form below &mdash;
      changes persist in memory on the server.
    </p>

    <form class="add-form" @submit.prevent="addItem">
      <input
        v-model="newItem"
        type="text"
        placeholder="Enter item name..."
        class="input"
      />
      <button type="submit" class="button">Add Item</button>
    </form>

    <ul class="item-list">
      <li v-for="item in items" :key="item.id" class="item">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-date">{{ new Date(item.createdAt).toLocaleString() }}</span>
      </li>
    </ul>

    <p v-if="!items?.length" class="empty">No items yet. Add one above!</p>
  </div>
</template>
