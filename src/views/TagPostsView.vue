<template>
  <div class="tag-posts">
    <div class="container">
      <header class="page-header">
        <div class="breadcrumb">
          <router-link to="/tags" class="breadcrumb-link">Tags</router-link>
          <span class="breadcrumb-separator">/</span>
          <span class="current-tag">{{ tag }}</span>
        </div>
        <h1 class="page-title">Posts tagged "{{ tag }}"</h1>
        <p class="page-subtitle">
          {{ posts.length }} post{{ posts.length !== 1 ? 's' : '' }} found
        </p>
      </header>

      <div v-if="loading" class="loading">
        Loading posts...
      </div>
      <div v-else-if="posts.length > 0" class="posts-grid">
        <PostCard 
          v-for="post in posts" 
          :key="post.id" 
          :post="post" 
        />
      </div>

      <div v-else class="no-posts">
        <p>No posts found with this tag.</p>
        <router-link to="/tags" class="back-link">
          ← Back to all tags
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PostCard from '../components/PostCard.vue';
import { BlogService } from '../services/blogService';

const route = useRoute();
const blogService = BlogService.getInstance();
const loading = ref(true);

const tag = computed(() => route.params.tag as string);

const posts = computed(() => {
  return blogService.getPostsByTag(tag.value);
});

onMounted(async () => {
  // Give the service time to load posts
  setTimeout(() => {
    loading.value = false;
  }, 100);
});
</script>

<style scoped>
.tag-posts {
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

.breadcrumb {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.breadcrumb-link {
  color: var(--accent-color);
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-link:hover {
  color: var(--accent-hover);
}

.breadcrumb-separator {
  color: var(--text-secondary);
}

.current-tag {
  color: var(--text-primary);
  font-weight: 500;
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

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.no-posts {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-secondary);
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--accent-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--accent-hover);
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style> 