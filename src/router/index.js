import Vue from "vue";
import VueRouter from "vue-router";
import appLogin from "../pages/app-login.vue";
import marketApp from "../pages/market-app.vue";
import store from "../store/index.js"
Vue.use(VueRouter);

const routes = [
  {
    name:'login',
    path: "/",
    component: appLogin,
  },
  {
    name:'market',
    path: "/market",
    component: marketApp,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(store.getters.user);
  if (to.name !== 'login' && !store.getters.user) next({ name: 'login' })
  else next()
})

export default router;
