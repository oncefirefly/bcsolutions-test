import { createRouter, createWebHistory } from 'vue-router';
import ConverterView from '../views/ConverterView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: ConverterView,
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../views/PortfolioView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
