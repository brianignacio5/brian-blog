<script setup lang="ts">
import BlogHeader from './components/BlogHeader.vue'
</script>

<template>
  <div class="app-container">
    <BlogHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
}

#app {
  min-height: 100vh;
  background-color: var(--bg-primary);
}

.app-container {
  min-height: 100vh;
  background-color: var(--bg-primary);
}

main {
  flex: 1;
  background-color: var(--bg-primary);
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
