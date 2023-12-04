import { createRouter, createWebHistory } from 'vue-router'
import MyPage from '@/views/MyPage.vue'
import ExamDateCalendar from '@/views/ExamDateCalendar.vue'
import MemberProgress from '@/views/MemberProgress.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/mypage/000' // リダイレクト設定
    },
    {
      path: '/mypage/',
      redirect: '/mypage/000' // リダイレクト設定
    },
    {
      path: '/mypage/:id',
      name: 'mypage',
      component: MyPage
    },
    {
      path: '/progress',
      name: 'progress',
      component: MemberProgress
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: ExamDateCalendar
    },
  ]
})

export default router
