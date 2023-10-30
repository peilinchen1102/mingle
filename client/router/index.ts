import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import { useUserStore } from "@/stores/user";
import FriendsView from "../views/FriendsView.vue";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MatchView from "../views/MatchView.vue";
import MessagesView from "../views/MessagesView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import ProfileView from "../views/ProfileView.vue";
import SettingView from "../views/SettingView.vue";
import StatusView from "../views/StatusView.vue";
import TaskView from "../views/TaskView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
    },
    {
      path: "/friends",
      name: "Friends",
      component: FriendsView,
    },
    {
      path: "/messages",
      name: "Messages",
      component: MessagesView,
    },
    {
      path: "/status",
      name: "Status",
      component: StatusView,
    },
    {
      path: "/tasks",
      name: "Tasks",
      component: TaskView,
    },
    {
      path: "/match",
      name: "Match",
      component: MatchView,
    },
    {
      path: "/setting",
      name: "Settings",
      component: SettingView,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
      meta: { requiresAuth: false },
      beforeEnter: (to, from) => {
        const { isLoggedIn } = storeToRefs(useUserStore());
        if (isLoggedIn.value) {
          return { name: "Settings" };
        }
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from) => {
  const { isLoggedIn } = storeToRefs(useUserStore());

  if (to.meta.requiresAuth && !isLoggedIn.value) {
    return { name: "Login" };
  }
});

export default router;
