import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PostsView from '../views/PostsView.vue';
import PostView from '../views/PostView.vue';
import TagsView from '../views/TagsView.vue';
import TagPostsView from '../views/TagPostsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostsView
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: PostView
    },
    {
      path: '/tags',
      name: 'tags',
      component: TagsView
    },
    {
      path: '/tags/:tag',
      name: 'tag-posts',
      component: TagPostsView
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

export default router; 