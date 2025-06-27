<template>
  <div class="posts">
    <div class="container">
      <header class="page-header">
        <h1 class="page-title">All Posts</h1>
        <p class="page-subtitle">
          {{ posts.length }} post{{ posts.length !== 1 ? 's' : '' }} published
        </p>
      </header>

      <div v-if="loading" class="loading">
        Loading posts...
      </div>
      <div v-else class="posts-grid">
        <PostCard 
          v-for="post in posts" 
          :key="post.id" 
          :post="post" 
        />
      </div>

      <div v-if="!loading && posts.length === 0" class="no-posts">
        <p>No posts found.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import PostCard from '../components/PostCard.vue';
import { BlogService } from '../services/blogService';

const blogService = BlogService.getInstance();
const loading = ref(true);

const posts = computed(() => {
  return blogService.getAllPostsMeta();
});

onMounted(async () => {
  // Give the service time to load posts
  setTimeout(() => {
    loading.value = false;
  }, 100);
});
</script>

<style scoped>
.posts {
  min-height: 100vh;
  background: #f9fafb;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.page-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 4rem 0;
  color: #6b7280;
  font-size: 1.125rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.no-posts {
  text-align: center;
  padding: 4rem 0;
  color: #6b7280;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style> 