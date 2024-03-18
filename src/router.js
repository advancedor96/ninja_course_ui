import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import BlogsView from './views/BlogsView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: LoginView },
    { path: '/blogs', component: BlogsView },
  ],
});

export default router;