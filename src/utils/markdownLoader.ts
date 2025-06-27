import { marked } from 'marked';
import matter from 'gray-matter';
import type { BlogPost, BlogPostMeta } from '../types/BlogPost';

// Configure marked for security
marked.setOptions({
  breaks: true,
  gfm: true,
});

export function parseMarkdownFile(content: string): BlogPost {
  const { data, content: markdownContent } = matter(content);
  
  return {
    id: data.id || generateId(data.title),
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    content: marked.parse(markdownContent) as string,
    slug: data.slug || generateSlug(data.title),
  };
}

export function parseMarkdownMeta(content: string): BlogPostMeta {
  const { data } = matter(content);
  
  return {
    id: data.id || generateId(data.title),
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    slug: data.slug || generateSlug(data.title),
  };
}

function generateId(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
} 