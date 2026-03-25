<script setup lang="ts">
</script>

<template>
  <div>
    <h2>About This Example</h2>
    <p class="description">
      This is a Nuxt 3 application demonstrating Vue SSR compatibility with DemoTape.
    </p>

    <div class="info-grid">
      <div class="info-card">
        <h3>Framework</h3>
        <p>Nuxt 3 with Vue 3 Composition API and <code>&lt;script setup&gt;</code> syntax.</p>
      </div>

      <div class="info-card">
        <h3>Server Routes</h3>
        <p>Nuxt server API routes handle item CRUD and health checks without a separate backend.</p>
      </div>

      <div class="info-card">
        <h3>SSR</h3>
        <p>Pages are server-rendered on first load, then hydrated for client-side navigation.</p>
      </div>

      <div class="info-card">
        <h3>DemoTape</h3>
        <p>Share this app via <code>demotape share 3000</code> and let clients browse it live.</p>
      </div>
    </div>
  </div>
</template>
