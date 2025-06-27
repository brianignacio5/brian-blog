<template>
  <div class="home">
    <div class="container">
      <section class="hero">
        <h1 class="hero-title">Welcome to My Blog</h1>
        <p class="hero-subtitle">
          Exploring web development, Vue.js, TypeScript, and everything in between.
        </p>
      </section>

      <section class="recent-posts">
        <h2 class="section-title">Recent Posts</h2>
        <div v-if="loading" class="loading">
          Loading posts...
        </div>
        <div v-else class="posts-grid">
          <PostCard 
            v-for="post in recentPosts" 
            :key="post.id" 
            :post="post" 
          />
        </div>
        <div v-if="!loading && recentPosts.length > 0" class="view-all">
          <router-link to="/posts" class="view-all-link">
            View all posts →
          </router-link>
        </div>
      </section>

      <section v-if="!loading" class="tags-section">
        <h2 class="section-title">Popular Tags</h2>
        <div class="tags-grid">
          <router-link 
            v-for="tag in popularTags" 
            :key="tag"
            :to="`/tags/${tag}`"
            class="tag-link"
          >
            {{ tag }}
          </router-link>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import PostCard from '../components/PostCard.vue';
import { BlogService } from '../services/blogService';

const blogService = BlogService.getInstance();
const loading = ref(true);

const recentPosts = computed(() => {
  return blogService.getAllPostsMeta().slice(0, 3);
});

const popularTags = computed(() => {
  return blogService.getAllTags().slice(0, 6);
});

onMounted(async () => {
  // Give the service time to load posts
  setTimeout(() => {
    loading.value = false;
  }, 100);
});
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: var(--bg-secondary);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 2rem 0;
}

.recent-posts {
  margin-bottom: 4rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.view-all {
  text-align: center;
}

.view-all-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--accent-color);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.view-all-link:hover {
  background: var(--accent-hover);
}

.tags-section {
  margin-bottom: 2rem;
}

.tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag-link {
  padding: 0.5rem 1rem;
  background: var(--border-color);
  color: var(--text-primary);
  text-decoration: none;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

.tag-link:hover {
  background: var(--accent-color);
  color: white;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style> 