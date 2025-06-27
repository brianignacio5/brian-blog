---
title: "Building a Dark Theme"
description: "How to implement a dark theme in Vue 3 applications"
date: "2024-01-20"
tags: ["vue", "css", "dark-theme", "ui"]
---

# Building a Dark Theme

Implementing a dark theme in Vue 3 applications is easier than you might think!

## CSS Custom Properties

The key to a good dark theme is using CSS custom properties (variables):

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
}

.dark {
  --bg-primary: #000000;
  --text-primary: #ffffff;
}
```

## Vue 3 Implementation

Using Vue 3's Composition API makes theme management simple:

```typescript
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
```

## Benefits

- 🌙 Better user experience
- 💾 Persistent preferences
- 🎨 Easy to customize
- 📱 Works on all devices

Dark themes are becoming the standard for modern web applications! 