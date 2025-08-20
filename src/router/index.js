import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Dashboard from '@/pages/Dashboard.vue'
import Settings from '@/pages/Settings.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        redirect: '/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'settings',
        name: 'Settings',
        component: Settings
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/**
 * 模擬登入檢查邏輯
 * 在這裡假設 localStorage 中的 `isLoggedIn === 'true'` 表示登入中
 */
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  if (to.path !== '/login' && !isLoggedIn) {
    // 未登入，強制轉到 login
    next('/login')
  } else if (to.path === '/login' && isLoggedIn) {
    // 已登入，導向 dashboard
    next('/dashboard')
  } else {
    next()
  }
})

export default router
