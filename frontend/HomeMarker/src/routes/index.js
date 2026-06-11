import { createRouter, createWebHistory } from 'vue-router'

import Auth from '../pages/Auth.vue';
import Login from '../pages/Login.vue';

const routes = [
    {
        path: '/auth_page',
        component: Auth,
    },
    {
        path: '/login_page',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;