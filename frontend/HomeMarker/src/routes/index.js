import { createRouter, createWebHistory } from 'vue-router'

import Login from "../pages/Login.vue";
import Auth from "../pages/Auth.vue";

const routes = [
    { path: "/login_page", component: Login },
    { path: "/auth_page", component: Auth }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// ОЦЕ ВСТАВЛЯЄШ ТУТ
router.beforeEach(async (to, from, next) => {
    const publicPages = ["/login_page", "/auth_page"];
    const authRequired = !publicPages.includes(to.path);

    let authenticated = false;

    try {
        const res = await fetch("http://localhost:3000/auth/me", {
            credentials: "include"
        });

        authenticated = res.ok;
    } catch {
        authenticated = false;
    }

    if (authRequired && !authenticated) {
        return next("/login_page");
    }

    if ((to.path === "/login_page" || to.path === "/auth_page") && authenticated) {
        return next("/");
    }

    next();
});

export default router;