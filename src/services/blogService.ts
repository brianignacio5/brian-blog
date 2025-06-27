import type { BlogPost, BlogPostMeta } from '../types/BlogPost';
import { parseMarkdownFile, parseMarkdownMeta } from '../utils/markdownLoader';

// Automatically import all markdown files from the content directory
const markdownFiles = import.meta.glob('../content/*.md', { 
  query: '?raw', 
  import: 'default' 
});

export class BlogService {
  private static instance: BlogService;
  private posts: BlogPost[] = [];
  private postsMeta: BlogPostMeta[] = [];

  private constructor() {
    this.loadPosts();
  }

  public static getInstance(): BlogService {
    if (!BlogService.instance) {
      BlogService.instance = new BlogService();
    }
    return BlogService.instance;
  }

  private async loadPosts(): Promise<void> {
    const postsData: Array<{ content: string; filename: string }> = [];
    
    // Load all markdown files automatically
    for (const path in markdownFiles) {
      try {
        const content = await markdownFiles[path]() as string;
        const filename = path.split('/').pop() || 'unknown.md';
        postsData.push({ content, filename });
      } catch (error) {
        console.error(`Error loading markdown file ${path}:`, error);
      }
    }

    // Parse markdown content
    this.posts = postsData.map(({ content }) => parseMarkdownFile(content));
    this.postsMeta = postsData.map(({ content }) => parseMarkdownMeta(content));
    
    // Sort by date (newest first)
    this.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.postsMeta.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  public getAllPosts(): BlogPost[] {
    return this.posts;
  }

  public getAllPostsMeta(): BlogPostMeta[] {
    return this.postsMeta;
  }

  public getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts.find(post => post.slug === slug);
  }

  public getPostsByTag(tag: string): BlogPost[] {
    return this.posts.filter(post => post.tags.includes(tag));
  }

  public getAllTags(): string[] {
    const allTags = this.posts.flatMap(post => post.tags);
    return [...new Set(allTags)].sort();
  }
} 