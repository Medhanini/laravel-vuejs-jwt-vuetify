
import VueRouter from 'vue-router';

import Vue from 'vue'
import index from './pages/index.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Profile from './pages/Profile.vue';
import store from './store';


Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: 'home',
            path: '/',
            component: index
        },
        {
            name: 'login',
            path: '/login',
            component: Login,
            meta: { guest : true }
        },
        {
            name: 'register',
            path: '/register',
            component: Register,
            meta: { guest : true }
        },
        {
            name: 'profile',
            path: '/Profile',
            component: Profile,
            meta: { secure : true }
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.secure)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (store.state.auth.loggedIn == false) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    } 
    else if(to.matched.some(record => record.meta.guest)) {
        if (store.state.auth.loggedIn == false) {
            next()
          } else {
            next({
                path: '/profile'
              })
          } 
      }
    else {
      next() // make sure to always call next()!
    }
  })
  
export default router;