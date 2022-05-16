import { createRouter, createWebHistory } from 'vue-router';
import ConverterView from '../views/ConverterView.vue';

const routes = [
  {
    path: '/',
    redirect: { name: 'Converter' },
  },
  {
    path: '/bcsolutions-test/converter',
    name: 'Converter',
    component: ConverterView,
  },
  {
    path: '/bcsolutions-test/portfolio',
    name: 'portfolio',
    component: () => import('../views/PortfolioView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
