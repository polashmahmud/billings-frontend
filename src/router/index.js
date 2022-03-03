import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store';

import Login from "@/views/Login";
import Dashboard from "@/views/Dashboard";
import Billings from "@/views/Billings";
import Home from "@/views/Home";
import Customers from "@/views/Customers";
import Bill from "@/views/Bill";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home,
        meta: { requiresAll: true },
    },
    {
        path: '/login',
        component: Login,
        meta: { guest: true },
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: {requiresUser: true},
    },
    {
        path: '/customers',
        component: Customers,
        meta: {requiresUser: true},
    },
    {
        path: '/customers/:id/bills',
        component: Bill,
        props: true,
        meta: {requiresUser: true},
    },
    {
        path: '/billings',
        component: Billings,
        meta: {requiresCustomer: true},
    },
    {
        path: "*",
        name: "NotFound",
        component: () => import("../views/PageNotFound"),
        meta: { requiresAll: true },
    },


]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresUser)) {
        if (store.getters['auth/isUser']) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresCustomer)) {
        if (store.getters['auth/isCustomer']) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        if (store.getters['auth/isUser']) {
            next("/dashboard");
            return;
        }
        if (store.getters['auth/isCustomer']) {
            next("/billings");
            return;
        }
        next();
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAll)) {
        if (store.getters['auth/isUser']) {
            next();
            return;
        }
        if (store.getters['auth/isCustomer']) {
            next();
            return;
        }
        next();
    } else {
        next();
    }
});

export default router
