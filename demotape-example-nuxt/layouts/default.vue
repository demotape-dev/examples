<script setup lang="ts">
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="container">
        <h1 class="logo">DemoTape Nuxt Example</h1>
        <nav class="nav">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
        </nav>
      </div>
    </header>
    <main class="main container">
      <slot />
    </main>
    <footer class="footer">
      <div class="container">
        <p>Built with Nuxt 3 &middot; Shared via <a href="https://demotape.dev" target="_blank">DemoTape</a></p>
      </div>
    </footer>
  </div>
</template>
