import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AppDetail from '@/views/AppDetail.vue';
import AppInfo from '@/components/AppDetail/AppInfo.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/detail',
      name: 'detail',
      component: AppDetail,
      children: [
        {
          path: 'appInfo',
          name: 'appInfo',
          component: AppInfo,
        },
      ],
    },
  ],
});

export default router;
