import Vue from "vue";
import Router from "vue-router";
// import store from '../store'

import Login from "../views/Login";
import Logout from "../views/Logout";
import Layout from "../views/Index";
import Home from "../views/Home";
import Internet from "../views/Internet";

Vue.use(Router);

const router = new Router({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },

  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        isPublic: true
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        isPublic: true
      }
    },
    {
      path: "/",
      component: Layout,
      children: [
        {
          path: "/",
          redirect: "/home"
        },
        {
          path: "/home",
          name: "home",
          component: Home
        },
        {
          path: "/internet",
          name: "internet",
          component: Internet
        }
        
      ]
    }
  ]
});

// router.beforeEach((to, from, next) => {
//   // if (!store.state.auth.token && !to.meta.isPublic) {
//   if (!to.meta.isPublic) {
//     return next({name: 'login'})
//   }
//   next()
// })

export default router;
