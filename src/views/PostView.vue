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
              <router-link 
                v-for="tag in post.tags" 
                :key="tag" 
                :to="`/tags/${tag}`"
                class="post-tag"
              >
                {{ tag }}
              </router-link>
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
  background: var(--bg-secondary);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.post-header {
  text-align: center;
  margin-bottom: 3rem;
}

.post-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.post-meta {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0 0 1rem 0;
}

.post-tags {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-tag {
  padding: 0.25rem 0.75rem;
  background: #3b82f6;
  color: #ffffff;
  border-radius: 15px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-block;
}

.post-tag:hover {
  background: #2563eb;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dark .post-tag {
  background: #60a5fa;
  color: #ffffff;
}

.dark .post-tag:hover {
  background: #3b82f6;
  color: #ffffff;
}

.post-content {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  line-height: 1.7;
  color: var(--text-primary);
}

.post-content h1,
.post-content h2,
.post-content h3,
.post-content h4,
.post-content h5,
.post-content h6 {
  color: var(--text-primary);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.post-content h1 {
  font-size: 2rem;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.post-content h2 {
  font-size: 1.75rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.25rem;
}

.post-content h3 {
  font-size: 1.5rem;
}

.post-content p {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.post-content ul,
.post-content ol {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.post-content li {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.post-content blockquote {
  border-left: 4px solid var(--accent-color);
  padding-left: 1rem;
  margin: 2rem 0;
  font-style: italic;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 0 4px 4px 0;
}

.post-content code {
  background: var(--bg-secondary);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.9em;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.post-content pre {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid var(--border-color);
}

.post-content pre code {
  background: none;
  padding: 0;
  border: none;
  color: var(--text-primary);
}

.post-content a {
  color: var(--accent-color);
  text-decoration: underline;
}

.post-content a:hover {
  color: var(--accent-hover);
}

.post-content img {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 1.5rem 0;
}

.post-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.post-content th,
.post-content td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.post-content th {
  background: var(--bg-secondary);
  font-weight: 600;
  color: var(--text-primary);
}

.post-content td {
  color: var(--text-primary);
}

.loading {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-secondary);
  font-size: 1.125rem;
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
  color: var(--text-secondary);
}

.not-found h1 {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
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