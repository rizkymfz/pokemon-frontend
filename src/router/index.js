import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import( /* webpackChunkName: "index" */ '@/views/IndexView.vue')
    },
    {
        path: '/detail/:id',
        name: 'detail',
        component: () => import( /* webpackChunkName: "detail" */ '@/views/DetailView.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router