import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/Login.vue"),
  },
  {
    path: "/",
    component: () => import("../layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/dashboard",
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../pages/Dashboard.vue"),
      },
      {
        path: "permission-management/create",
        name: "PermissionCreate",
        component: () => import("../pages/permission-management/Create.vue"),
      },
      {
        path: "permission-management/setting",
        name: "PermissionSetting",
        component: () => import("../pages/permission-management/Setting.vue"),
      },
      {
        path: "permission-management/update",
        name: "PermissionUpdate",
        component: () => import("../pages/permission-management/Update.vue"),
      },
      {
        path: "report",
        name: "Report",
        component: () => import("../pages/Report.vue"),
      },
      {
        path: "/map",
        redirect: "/map/1/1",
      },
      {
        path: "/map/:id",
        redirect: (to) => {
          return `/map/${to.params.id}/1`;
        },
      },
      {
        path: "/map/:id/:subId",
        name: "Map",
        component: () => import("../pages/map/MapLayout.vue"),
      },
      {
        path: "/bi",
        component: () => import("../pages/bi/BiLayout.vue"),
        children: [
          {
            path: "statistics/:subId(\\d+)",
            name: "BiStatistics",
            component: () => import("../pages/bi/Statistics/Statistics.vue"),
          },
          {
            path: "access/:subId(\\d+)",
            name: "BiAccess",
            component: () => import("../pages/bi/Access/Access.vue"),
          },
          {
            path: "flight/:subId(\\d+)",
            name: "BiFlight",
            component: () => import("../pages/bi/Flight/Flight.vue"),
          },
          {
            path: "statistics",
            redirect: "/bi/statistics/1",
          },
          {
            path: "access",
            redirect: "/bi/access/1",
          },
          {
            path: "flight",
            redirect: "/bi/flight/1",
          },
        ],
      },
      {
        path: "/chart/:chartName",
        component: () => import("../pages/chart/ChartPage.vue"),
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
