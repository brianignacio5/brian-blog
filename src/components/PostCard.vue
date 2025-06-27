<template>
  <article class="post-card">
    <router-link :to="`/post/${post.slug}`" class="post-link">
      <div class="post-meta">
        <time :datetime="post.date" class="post-date">
          {{ formatDate(post.date) }}
        </time>
        <div class="post-tags">
          <span 
            v-for="tag in post.tags.slice(0, 3)" 
            :key="tag" 
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <h2 class="post-title">{{ post.title }}</h2>
      <p class="post-description">{{ post.description }}</p>
      <div class="read-more">Read more →</div>
    </router-link>
  </article>
</template>

<script setup lang="ts">
import type { BlogPostMeta } from '../types/BlogPost';

interface Props {
  post: BlogPostMeta;
}

defineProps<Props>();

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
</script>

<style scoped>
.post-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s;
}

.post-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.post-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
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
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  line-height: 1.4;
}

.post-description {
  margin: 0 0 1rem 0;
  color: #6b7280;
  line-height: 1.6;
}

.read-more {
  color: #3b82f6;
  font-weight: 500;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style> 