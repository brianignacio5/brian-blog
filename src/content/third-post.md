---
title: "Automatic Post Discovery"
description: "Testing the new automatic markdown file discovery feature"
date: "2024-01-25"
tags: ["vue", "vite", "automation"]
---

# Automatic Post Discovery

This post is testing the new automatic markdown file discovery feature! 

## How It Works

The blog now automatically discovers and loads all markdown files from the `src/content/` directory using Vite's `import.meta.glob` feature.

### Benefits

- ✅ **No manual configuration** - just create a `.md` file
- ✅ **Automatic loading** - posts appear instantly
- ✅ **Hot reload** - changes are reflected immediately
- ✅ **Clean architecture** - separation of content and code

## Code Example

The blog service now uses this pattern:

```typescript
const markdownFiles = import.meta.glob('../content/*.md', { 
  query: '?raw', 
  import: 'default' 
});
```

This automatically imports all markdown files as raw strings, making them available for processing.

## Next Steps

Try creating your own markdown file in the `src/content/` directory and see it appear automatically in your blog! 