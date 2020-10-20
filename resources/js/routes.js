import index from './pages/index.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Profile from './pages/Profile.vue';

export const routes = [
    {
        name: 'home',
        path: '/',
        component: index
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        name: 'profile',
        path: '/Profile',
        component: Profile
    }
];