import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/components/Layout/Layout.vue';
import HomePage from '@/views/home/HomePage.vue';
import OrdersPage from '@/views/orders/OrdersPage.vue';
import Login from '@/views/auth/Login.vue';

let isAuthenticated = false; // 인증 상태를 저장하는 로컬 변수

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage,
        meta: { requiresAuth: true }, // 인증 필요 설정
      },
      {
        path: 'orders/:productId',
        name: 'orders',
        component: OrdersPage,
        meta: { requiresAuth: true }, // 인증 필요 설정
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated) {
    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    next({ name: 'login' });
  } else {
    // 인증된 경우 또는 인증 필요 없는 경우 그대로 진행
    next();
  }
});

export default router;
