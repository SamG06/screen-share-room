import { createWebHistory, createRouter } from "vue-router";

import Home from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "Host Room",
    component: Home,
  },
  {
    path: "/join/:roomID",
    name: "Join Room",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
