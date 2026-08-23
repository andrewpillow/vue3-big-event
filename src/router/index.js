import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  // history模式：createWebHistory  （地址栏不带#）
  // hash模式：createHashHistory

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 以下component的写法 为路由懒加载 可以提升首屏加载的速度
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: 'article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: 'article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: 'user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: 'user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: 'user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

// 登录访问拦截
// 访问非login界面若无token 则跳转至login界面
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path != '/login') {
    return '/login'
  }
})

export default router
