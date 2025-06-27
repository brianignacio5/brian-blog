# Brian's Blog

A modern, responsive blog built with Vue 3, TypeScript, and Markdown. Perfect for developers who want to write content in Markdown and deploy to GitHub Pages.

## Features

- ✅ **Vue 3** with Composition API
- ✅ **TypeScript** for type safety
- ✅ **Markdown** support with frontmatter
- ✅ **Vue Router** for navigation
- ✅ **Responsive design** for all devices
- ✅ **GitHub Pages** deployment ready
- ✅ **Fast build** with Vite
- ✅ **SEO friendly** structure
- ✅ **Automatic post discovery** - no manual configuration needed!

## Tech Stack

- **Frontend**: Vue 3 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with responsive design
- **Markdown**: marked + gray-matter
- **Routing**: Vue Router 4
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/brianignacio5/brian-blog.git
cd brian-blog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173/brian-blog/`

## Project Structure

```
brian-blog/
├── src/
│   ├── components/          # Vue components
│   │   ├── BlogHeader.vue
│   │   └── PostCard.vue
│   ├── content/             # Markdown blog posts
│   │   ├── first-post.md
│   │   └── second-post.md
│   ├── services/            # Business logic
│   │   └── blogService.ts   # Automatically discovers markdown files
│   ├── types/               # TypeScript interfaces
│   │   └── BlogPost.ts
│   ├── utils/               # Utility functions
│   │   └── markdownLoader.ts
│   ├── views/               # Page components
│   │   ├── HomeView.vue
│   │   ├── PostsView.vue
│   │   └── PostView.vue
│   ├── router/              # Vue Router configuration
│   │   └── index.ts
│   ├── App.vue
│   └── main.ts
├── public/                  # Static assets
├── dist/                    # Build output
├── package.json
├── vite.config.ts
└── README.md
```

## Writing Blog Posts

Blog posts are written in Markdown format with YAML frontmatter. Create new posts in the `src/content/` directory.

### Post Structure

```markdown
---
title: "Your Post Title"
description: "A brief description of your post"
date: "2024-01-15"
tags: ["vue", "typescript", "markdown"]
---

# Your Post Content

Write your content in Markdown format...

## Code Examples

```typescript
function example() {
  return "Hello World!";
}
```

## Lists

- Item 1
- Item 2
- Item 3
```

### Adding New Posts

**Simply create a new `.md` file in `src/content/` and it will automatically appear in your blog!**

1. Create a new `.md` file in `src/content/`
2. Add the frontmatter with required metadata
3. Write your content in Markdown
4. **That's it!** The blog automatically discovers and loads all markdown files

**No manual configuration needed!** The blog service uses Vite's `import.meta.glob` to automatically discover all markdown files in the content directory.

## Deployment to GitHub Pages

### Automatic Deployment

1. Push your code to GitHub
2. Run the deployment command:
```bash
npm run deploy
```

3. Go to your repository settings on GitHub
4. Navigate to "Pages" in the sidebar
5. Select "gh-pages" branch as source
6. Your blog will be available at `https://yourusername.github.io/brian-blog/`

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

## Configuration

### Base URL

Update the base URL in `vite.config.ts` to match your repository name:

```typescript
export default defineConfig({
  plugins: [vue()],
  base: '/your-repo-name/', // Change this
  // ...
})
```

### Customization

- **Styling**: Modify CSS in component files
- **Layout**: Update `BlogHeader.vue` and other components
- **Metadata**: Change site title, description, etc.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## Troubleshooting

### Buffer Error
If you encounter a "Buffer is not defined" error, the project includes the necessary polyfills. Make sure you have the latest dependencies installed.

### Build Issues
If you encounter build issues, try:
```bash
npm install
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you have any questions or need help, please open an issue on GitHub.
