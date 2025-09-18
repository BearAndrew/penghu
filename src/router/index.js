import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import('../pages/Login.vue'),
  },
  {
    path: "/",
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: "",
        redirect: "/dashboard",
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import('../pages/Dashboard.vue'),
      },
      {
        path: "permission-management/create",
        name: "PermissionCreate",
        component: () => import('../pages/permission-management/Create.vue'),
      },
      {
        path: "permission-management/setting",
        name: "PermissionSetting",
        component: () => import('../pages/permission-management/Setting.vue'),
      },
      {
        path: "permission-management/update",
        name: "PermissionUpdate",
        component: () => import('../pages/permission-management/Update.vue'),
      },
      {
        path: "report",
        name: "Report",
        component: () => import('../pages/Report.vue'),
      },
      {
        path: "map/:id/:subId",
        name: "Map",
        component: () => import('../pages/map/MapLayout.vue'),
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
