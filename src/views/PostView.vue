<template>
  <div class="post">
    <div class="container">
      <div v-if="loading" class="loading">
        Loading post...
      </div>
      <div v-else-if="post" class="post-content">
        <header class="post-header">
          <div class="post-meta">
            <time :datetime="post.date" class="post-date">
              {{ formatDate(post.date) }}
            </time>
            <div class="post-tags">
              <span 
                v-for="tag in post.tags" 
                :key="tag" 
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-description">{{ post.description }}</p>
        </header>

        <div class="post-body">
          <div v-html="post.content" class="markdown-content"></div>
        </div>

        <footer class="post-footer">
          <router-link to="/posts" class="back-link">
            ← Back to all posts
          </router-link>
        </footer>
      </div>

      <div v-else class="not-found">
        <h1>Post not found</h1>
        <p>The post you're looking for doesn't exist.</p>
        <router-link to="/posts" class="back-link">
          ← Back to all posts
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { BlogService } from '../services/blogService';

const route = useRoute();
const blogService = BlogService.getInstance();
const loading = ref(true);

const post = computed(() => {
  const slug = route.params.slug as string;
  return blogService.getPostBySlug(slug);
});

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

onMounted(async () => {
  // Give the service time to load posts
  setTimeout(() => {
    loading.value = false;
  }, 100);
});
</script>

<style scoped>
.post {
  min-height: 100vh;
  background: #f9fafb;
  padding: 2rem 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.loading {
  text-align: center;
  padding: 4rem 0;
  color: #6b7280;
  font-size: 1.125rem;
}

.post-content {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.post-date {
  color: #6b7280;
  font-size: 0.875rem;
}

.post-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.post-description {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

.post-body {
  margin-bottom: 2rem;
}

.markdown-content {
  line-height: 1.7;
  color: #374151;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  color: #1f2937;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.markdown-content :deep(h1) {
  font-size: 2rem;
  font-weight: 700;
}

.markdown-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
}

.markdown-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
}

.markdown-content :deep(p) {
  margin-bottom: 1rem;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5rem;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #6b7280;
  font-style: italic;
}

.markdown-content :deep(code) {
  background: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.markdown-content :deep(pre) {
  background: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
}

.post-footer {
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.back-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: #2563eb;
}

.not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found h1 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.not-found p {
  color: #6b7280;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .post-content {
    padding: 1.5rem;
  }
  
  .post-title {
    font-size: 2rem;
  }
  
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style> 