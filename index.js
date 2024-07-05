import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import TaskList from '../components/TaskList.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/tasks', component: TaskList }
  ]
});

export default router;
