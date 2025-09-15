import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import Dashboard from "@/pages/Dashboard.vue";
import PermissionCreate from "@/pages/permission-management/Create.vue";
import PermissionSetting from "@/pages/permission-management/Setting.vue";
import PermissionUpdate from "@/pages/permission-management/Update.vue";
import Report from "@/pages/Report.vue";
import Map from "@/pages/map/MapLayout.vue";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        redirect: "/dashboard",
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "permission-management/create",
        name: "PermissionCreate",
        component: PermissionCreate,
      },
      {
        path: "permission-management/setting",
        name: "PermissionSetting",
        component: PermissionSetting,
      },
      {
        path: "permission-management/update",
        name: "PermissionUpdate",
        component: PermissionUpdate,
      },
      {
        path: "report",
        name: "Report",
        component: Report,
      },
      {
        path: "/map",
        name: "Map",
        component: Map,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (to.path !== "/login" && !isLoggedIn) {
    next("/login");
  } else if (to.path === "/login" && isLoggedIn) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
