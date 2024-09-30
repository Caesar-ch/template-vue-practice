import { createRouter, createWebHistory } from 'vue-router'
import DragTable from '../views/DragTable/DragTable.vue'
import CustomDrag from '@/views/CustomDrag/CustomDrag.vue'

const routes = [
  {
    path: '/',
    name: 'DragTable',
    component: DragTable
  },
  {
    path: '/compare',
    name: 'compare',
    component: () => import(/* webpackChunkName: "RefAndReactive" */ '../views/RefAndReactive/RefAndReactive.vue'),
  },
  {
    path: '/adapt',
    name: 'adapt',
    component: () => import(/* webpackChunkName: "MobileAdaptation" */ '../views/MobileAdaptation/MobileAdaptation.vue'),
  },
  {
    path: '/grid',
    name: 'grid',
    component: () => import(/* webpackChunkName: "GridLayout" */ '../views/GridLayout/GridLayout.vue'),
  },
  {
    path: '/key',
    name: 'key',
    component: () => import(/* webpackChunkName: "KeyImportant" */ '../views/KeyImportant/KeyImportant.vue'),
  },
  {
    path: '/theme',
    name: 'theme',
    component: () => import(/* webpackChunkName: "ThemeToggle" */ '../views/ThemeToggle/ThemeToggle.vue'),
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "ThemeToggle" */ '../views/Test/Test.vue'),
    children: [
      {
        path: '/listening',
        name: 'listening',
        component: () => import(/* webpackChunkName: "ThemeToggle" */ '../views/Test/Listening/Listening.vue'),
        component: () => import(/* webpackChunkName: "ThemeToggle" */ '../views/Test/Listening/Listening.vue'),
      }
    ]
  },
  {
    path: '/custom-drag',
    name: 'CustomDrag',
    component: CustomDrag
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
