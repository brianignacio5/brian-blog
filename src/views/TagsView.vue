<template>
  <div class="tags">
    <div class="container">
      <header class="page-header">
        <h1 class="page-title">All Tags</h1>
        <p class="page-subtitle">
          {{ tags.length }} tag{{ tags.length !== 1 ? 's' : '' }} available
        </p>
      </header>

      <div v-if="loading" class="loading">
        Loading tags...
      </div>
      <div v-else class="tags-grid">
        <router-link 
          v-for="tag in tags" 
          :key="tag"
          :to="`/tags/${tag}`"
          class="tag-card"
        >
          <div class="tag-info">
            <h3 class="tag-name">{{ tag }}</h3>
            <p class="tag-count">
              {{ getPostsByTag(tag).length }} post{{ getPostsByTag(tag).length !== 1 ? 's' : '' }}
            </p>
          </div>
          <div class="tag-arrow">→</div>
        </router-link>
      </div>

      <div v-if="!loading && tags.length === 0" class="no-tags">
        <p>No tags found.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { BlogService } from '../services/blogService';

const blogService = BlogService.getInstance();
const loading = ref(true);

const tags = computed(() => {
  return blogService.getAllTags();
});

const getPostsByTag = (tag: string) => {
  return blogService.getPostsByTag(tag);
};

onMounted(async () => {
  // Give the service time to load posts
  setTimeout(() => {
    loading.value = false;
  }, 100);
});
</script>

<style scoped>
.tags {
  min-height: 100vh;
  background: var(--bg-secondary);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin: 0;
}

.loading {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.tag-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tag-card:hover {
  border-color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.tag-info {
  flex: 1;
}

.tag-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.tag-count {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 0;
}

.tag-arrow {
  color: var(--accent-color);
  font-size: 1.25rem;
  font-weight: 500;
  transition: transform 0.2s;
}

.tag-card:hover .tag-arrow {
  transform: translateX(4px);
}

.no-tags {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .tags-grid {
    grid-template-columns: 1fr;
  }
}
</style> 