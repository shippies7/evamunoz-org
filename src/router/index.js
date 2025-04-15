import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import Survey from '../views/Survey.vue';
import ElosHome from '../views/elos/ElosHome.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/survey', component: Survey },
  { path: '/dashboard', component: Dashboard },
  { path: '/elos', component: ElosHome },
{ path: '/eloshome', component: ElosHome },
,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
