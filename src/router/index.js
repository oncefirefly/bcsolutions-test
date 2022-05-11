import { createRouter, createWebHistory } from "vue-router";
import ConverterView from "../views/ConverterView.vue";
import HomeView from "../views/HomeView";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/converter",
    name: "converter",
    component: ConverterView,
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: () => import("../views/PortfolioView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
