import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/home-layout/HomeLayout.vue'),
      children:[
        {
          path:'/',
          name:'beforelogin',
          component: () => import('@/views/home/BeforelLogin.vue'),
        },
        {
          path:'afterlogin',
          name:'afterlogin',
          component: () => import('@/views/home/AfterLogin.vue'),
        },
        {
          path:'about',
          name:'about',
          component: () => import('@/views/home/About.vue'),
        },
        {
          path:'contect',
          name:'contect',
          component: () => import('@/views/home/Contect.vue'),
        },
        {
          path:'help',
          name:'help',
          component: () => import('@/views/home/Help.vue'),
        },
      ]
    },
    
    {
      path: '/video',
      name: 'video',
      component: () => import('@/components/play-layout/PlayLayout.vue'),
      meta: { title: '首页' },
      redirect:{name:'select'},
      children: [
        {
          path: 'upload',
          name:'upload',
          component: () => import('@/views/select/Video-upload.vue'),
          meta: { title: '上传视频' }
        },
        {
          path: 'document',
          name: 'Document',
          component: () => import('@/views/select/DocumentPage.vue'),
          meta: { title: '视频文件' }
        },
        {
          path: 'link',
          name: 'LinkPage',
          component: () => import('@/views/select/LinkPage.vue'),
          meta: { title: '视频链接' }
        },
        // {
        //   path: 'list',
        //   name: 'ListPage',
        //   component: () => import('@/views/select/ListPage.vue'),
        //   meta: { title: '视频列表' }
        // },
        {
          path: 'play',
          name: 'PlayPage',
          component: () => import('@/views/play/Play.vue'),
          meta: { title: '视频播放' }
        },
        {
          path: '/:xxx(.*)*',
          name: 'ErrorPage',
          component: () => import('@/views/ErrorPage.vue'),
          meta: { title: '报错页' }
        },
        
      ]
    },
    {
      path: '/lecture/:lectureId',
      component: () => import('@/views/lecture-player/LecturePlayer.vue'),
    }
  ]
})

export default router
