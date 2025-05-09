import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Survey from '../views/Survey.vue';
import ElosHome from '../views/elos/ElosHome.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/survey', component: Survey },
  { path: '/dashboard', component: Dashboard },
  { path: '/elos', component: ElosHome },
  { path: '/eloshome', component: ElosHome },
  {
    path: "/vivo",
    name: "Vivo",
    component: () => import("../views/Vivo.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/privacidad",
    name: "Privacy",
    component: () => import("../views/Privacy.vue")
  },
  {
    path: "/terminos",
    name: "Terms",
    component: () => import("../views/Terms.vue")
  },
  {
    path: "/soporte",
    name: "Support",
    component: () => import("../views/Support.vue")
  },
  {
    path: "/zoom-docs",
    name: "ZoomDocs",
    component: () => import("../views/ZoomDocs.vue")
  },
  {
    path: "/zoom-redirect",
    name: "ZoomRedirect",
    component: () => import("../views/ZoomRedirect.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔒 Protegemos rutas con requiresAuth
const auth = getAuth();

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        next('/login');
      }
    });
  } else {
    next();
  }
});

export default router;
