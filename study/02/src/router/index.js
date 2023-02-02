import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    name: "基础",
    path: "/basic",
    component: () => import("../views/Basic.vue"),
  },
  {
    name: "光线",
    path: "/light",
    component: () => import("../views/Light.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
